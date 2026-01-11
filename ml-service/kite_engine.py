import os
import logging
from kiteconnect import KiteConnect
from typing import Dict, List, Optional

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class KiteEngine:
    """
    Manages Zerodha Kite API connection and data retrieval.
    """
    
    def __init__(self):
        self.api_key = os.getenv("KITE_API_KEY")
        self.api_secret = os.getenv("KITE_API_SECRET")
        self.access_token = os.getenv("KITE_ACCESS_TOKEN")
        self.kite = None
        
        if self.api_key:
            self.kite = KiteConnect(api_key=self.api_key)
            if self.access_token:
                self.kite.set_access_token(self.access_token)
                logger.info("Kite session established with cached token.")

    def get_login_url(self):
        """Generates the login URL for user authentication."""
        if not self.api_key:
            return None
        return self.kite.login_url()

    def generate_session(self, request_token: str):
        """Generates a session and access token using the request token."""
        try:
            data = self.kite.generate_session(request_token, api_secret=self.api_secret)
            self.access_token = data["access_token"]
            self.kite.set_access_token(self.access_token)
            # In a real app, you'd save this to a database or secure storage
            logger.info("Kite session generated successfully.")
            return data
        except Exception as e:
            logger.error(f"Failed to generate Kite session: {e}")
            return None

    def get_holdings(self) -> List[Dict]:
        """Fetches the user's holdings."""
        if not self.kite or not self.access_token:
            return []
        try:
            return self.kite.holdings()
        except Exception as e:
            logger.error(f"Error fetching holdings: {e}")
            return []

    def get_positions(self) -> Dict:
        """Fetches the user's current positions."""
        if not self.kite or not self.access_token:
            return {"day": [], "net": []}
        try:
            return self.kite.positions()
        except Exception as e:
            logger.error(f"Error fetching positions: {e}")
            return {"day": [], "net": []}

    def get_ltp(self, instruments: List[str]) -> Dict:
        """Fetches Last Traded Price for a list of instruments."""
        if not self.kite or not self.access_token:
            return {}
        try:
            return self.kite.ltp(instruments)
        except Exception as e:
            logger.error(f"Error fetching LTP: {e}")
            return {}

    def is_active(self) -> bool:
        """Checks if the Kite session is active."""
        return self.kite is not None and self.access_token is not None
