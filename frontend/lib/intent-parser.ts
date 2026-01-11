export interface Intent {
    action: "PREDICT" | "SENTIMENT" | "ADVISORY" | "REBALANCE" | "GENERAL";
    symbol?: string;
}

const STOCK_SYMBOLS = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK", "BTC", "ETH", "SOL", "TATAMOTORS", "ZOMATO"];

export function parseIntent(input: string): Intent {
    const text = input.toUpperCase();

    // Check for symbols
    const foundSymbol = STOCK_SYMBOLS.find(s => text.includes(s));

    if (text.includes("REBALANCE") || text.includes("PORTFOLIO")) {
        return { action: "REBALANCE" };
    }

    if (foundSymbol) {
        if (text.includes("PREDICT") || text.includes("FUTURE") || text.includes("PRICE")) {
            return { action: "PREDICT", symbol: foundSymbol };
        }
        if (text.includes("SENTIMENT") || text.includes("NEWS") || text.includes("FEELING")) {
            return { action: "SENTIMENT", symbol: foundSymbol };
        }
        return { action: "ADVISORY", symbol: foundSymbol };
    }

    return { action: "GENERAL" };
}
