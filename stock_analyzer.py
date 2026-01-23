import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import sys

def fetch_stock_data(symbol, period="6mo"):
    """
    Fetches historical stock data using yfinance.
    """
    try:
        print(f"Fetching data for {symbol}...")
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=period)
        
        if df.empty:
            raise ValueError(f"No data found for symbol '{symbol}'. Please check the ticker name (e.g., AAPL or RELIANCE.NS).")
            
        return df
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def calculate_indicators(df):
    """
    Calculates technical indicators: SMA, RSI, and MACD.
    """
    # 1. Moving Averages
    df['SMA20'] = df['Close'].rolling(window=20).mean()
    df['SMA50'] = df['Close'].rolling(window=50).mean()
    
    # 2. RSI (Relative Strength Index)
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))
    
    # 3. MACD (Moving Average Convergence Divergence)
    exp1 = df['Close'].ewm(span=12, adjust=False).mean()
    exp2 = df['Close'].ewm(span=26, adjust=False).mean()
    df['MACD'] = exp1 - exp2
    df['Signal_Line'] = df['MACD'].ewm(span=9, adjust=False).mean()
    
    return df

def generate_signal(df):
    """
    Generates a simple BUY/SELL/HOLD signal based on indicators.
    """
    latest = df.iloc[-1]
    prev = df.iloc[-2]
    
    # Simple Logic:
    # BUY: Price > SMA20 AND MACD crosses above Signal Line AND RSI not overbought
    # SELL: Price < SMA20 OR MACD crosses below Signal Line OR RSI overbought
    
    buy_cond = (latest['Close'] > latest['SMA20']) and \
               (latest['MACD'] > latest['Signal_Line']) and \
               (latest['RSI'] < 70)
               
    sell_cond = (latest['Close'] < latest['SMA20']) or \
                (latest['MACD'] < latest['Signal_Line']) or \
                (latest['RSI'] > 70)
    
    if buy_cond:
        return "BUY"
    elif sell_cond:
        return "SELL"
    else:
        return "HOLD"

def plot_stock_data(df, symbol):
    """
    Plots the closing price and moving averages.
    """
    plt.figure(figsize=(12, 6))
    plt.plot(df.index, df['Close'], label='Close Price', color='blue', alpha=0.8)
    plt.plot(df.index, df['SMA20'], label='20-Day SMA', color='orange', linestyle='--')
    plt.plot(df.index, df['SMA50'], label='50-Day SMA', color='green', linestyle='--')
    
    plt.title(f"Stock Price Analysis: {symbol}")
    plt.xlabel("Date")
    plt.ylabel("Price")
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.show()

def main():
    """
    Main execution flow.
    """
    print("--- Professional Stock Analyzer ---")
    symbol = input("Enter Stock Symbol (e.g., AAPL, RELIANCE.NS): ").strip().upper()
    
    if not symbol:
        print("Invalid input. Symbol cannot be empty.")
        return

    # 1. Fetch Data
    df = fetch_stock_data(symbol)
    if df is None:
        return

    # 2. Calculate Indicators
    df = calculate_indicators(df)
    
    # Wait for indicators to have enough data points (min 50 for SMA50)
    if len(df) < 50:
        print("Warning: Not enough historical data to generate reliable signals (need at least 50 days).")
        # Proceed anyway but with a warning
    
    # 3. Generate Signal
    signal = generate_signal(df)
    
    latest_price = df['Close'].iloc[-1]
    latest_rsi = df['RSI'].iloc[-1]
    
    print("\n" + "="*30)
    print(f"Analysis for {symbol}")
    print(f"Current Price: {latest_price:.2f}")
    print(f"RSI (14):      {latest_rsi:.2f}")
    print(f"Signal:        {signal}")
    print("="*30 + "\n")
    
    # 4. Visualization
    try:
        plot_stock_data(df, symbol)
    except Exception as e:
        print(f"Could not display chart: {e}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
        sys.exit(0)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
