import requests
from functools import lru_cache
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import re
import json
import os
import logging

logger = logging.getLogger(__name__)


class SentimentEngine:
    def __init__(self, redis_host='localhost', redis_port=6379, finnhub_api_key=None):
        self.finnhub_api_key = finnhub_api_key or os.getenv("FINNHUB_API_KEY", "sandbox_c8m9r2aad3i9obs7e6ag")
        self.model_name = "ProsusAI/finbert"
        self.tokenizer = None
        self.model = None
        self.redis_client = None
        self.stop_words = set()
        self.lemmatizer = None

        # Initialize NLTK lazily
        try:
            import nltk
            nltk.download('stopwords', quiet=True)
            nltk.download('wordnet', quiet=True)
            from nltk.corpus import stopwords
            from nltk.stem import WordNetLemmatizer
            self.stop_words = set(stopwords.words('english'))
            self.lemmatizer = WordNetLemmatizer()
        except Exception:
            logger.warning("NLTK resources not available. Text preprocessing will be basic.")

        # Try connecting to Redis (optional, graceful fallback)
        try:
            import redis
            self.redis_client = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)
            self.redis_client.ping()
            logger.info("Redis connected for sentiment caching.")
        except Exception:
            logger.info("Redis not available — sentiment caching disabled.")
            self.redis_client = None

    def _load_model(self):
        """Lazy load FinBERT model (only when /sentiment is called)."""
        if self.model is None:
            logger.info("Loading FinBERT model on first /sentiment request...")
            try:
                from transformers import AutoTokenizer, AutoModelForSequenceClassification
                self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
                self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name)
                self.model.eval()
                logger.info("FinBERT loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load FinBERT: {e}")
                raise

    def clean_text(self, text):
        """Preprocess text for NLP."""
        text = text.lower()
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE) # URLs
        text = re.sub(r'\@\w+|\#','', text) # Mentions/Hashtags
        text = re.sub(r'[^a-zA-Z\s]', '', text) # Non-alpha
        
        words = text.split()
        words = [w for w in words if w not in self.stop_words]
        if self.lemmatizer:
            words = [self.lemmatizer.lemmatize(w) for w in words]
        
        return " ".join(words)

    def fetch_news(self, symbol):
        """Fetch news from Finnhub."""
        end_date = datetime.now().strftime('%Y-%m-%d')
        start_date = (datetime.now() - timedelta(days=3)).strftime('%Y-%m-%d')
        
        # Mapping symbol to Finnhub compatible if needed
        fsymbol = symbol.replace(".NS", "")
        
        url = f"https://finnhub.io/api/v1/company-news?symbol={fsymbol}&from={start_date}&to={end_date}&token={self.finnhub_api_key}"
        
        try:
            response = requests.get(url)
            if response.status_code == 200:
                news = response.json()
                # Deduplicate by title
                unique_news = {}
                for item in news:
                    title = item.get('headline', '')
                    if title and title not in unique_news:
                        unique_news[title] = {
                            'text': title + ". " + item.get('summary', ''),
                            'timestamp': item.get('datetime', 0)
                        }
                return list(unique_news.values())
            else:
                print(f"Finnhub error: {response.status_code}")
                return []
        except Exception as e:
            print(f"Error fetching news: {e}")
            return []

    def get_sentiment_score(self, texts):
        """Analyze sentiment of list of texts using FinBERT."""
        if not texts:
            return 0.5

        self._load_model()

        import torch  # Lazy import — only loaded when sentiment is called
        scores = []
        with torch.no_grad():
            for text in texts:
                inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
                outputs = self.model(**inputs)
                probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
                sentiment_val = probs[0][0].item() - probs[0][1].item()
                normalized = (sentiment_val + 1) / 2
                scores.append(normalized)

        return scores

    @lru_cache(maxsize=128)
    def analyze_symbol(self, symbol):
        """End-to-end sentiment analysis for a symbol."""
        # 1. Check cache
        if self.redis_client:
            cached = self.redis_client.get(f"sentiment:{symbol}")
            if cached:
                return json.loads(cached)

        # 2. Fetch
        news_items = self.fetch_news(symbol)
        if not news_items:
            # Fallback score if no news
            return self._format_response(symbol, 0.5, 0, "No news found")

        # 3. Process
        texts = [item['text'] for item in news_items]
        clean_texts = [self.clean_text(t) for t in texts]
        
        # 4. Sentiment
        raw_scores = self.get_sentiment_score(clean_texts)
        
        # 5. Aggregate (Weighted by recency)
        # weight = exp(-t/decay) where t is hours from now
        now_ts = datetime.now().timestamp()
        weighted_sum = 0
        total_weight = 0
        decay = 24 # 24 hours decay
        
        for score, item in zip(raw_scores, news_items):
            ts = item['timestamp']
            hours_ago = max(0, (now_ts - ts) / 3600)
            weight = np.exp(-hours_ago / decay)
            weighted_sum += score * weight
            total_weight += weight
        
        final_score = weighted_sum / total_weight if total_weight > 0 else 0.5
        
        response = self._format_response(symbol, final_score, len(news_items), "FinBERT")
        
        # 6. Cache (1h)
        if self.redis_client:
            self.redis_client.setex(f"sentiment:{symbol}", 3600, json.dumps(response))
            
        return response

    def _format_response(self, symbol, score, count, model):
        return {
            "symbol": symbol,
            "score": round(score, 4),
            "sources": count,
            "model_used": model,
            "updated_at": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

if __name__ == "__main__":
    # Test
    se = SentimentEngine()
    print(se.analyze_symbol("RELIANCE"))
