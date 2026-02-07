export const CHAINS = {
    ETH: {
        id: 1,
        name: "Ethereum",
        rpc: "https://cloudflare-eth.com",
        symbol: "ETH",
        explorer: "https://etherscan.io",
    },
    BSC: {
        id: 56,
        name: "BNB Smart Chain",
        rpc: "https://bsc-dataseed.binance.org",
        symbol: "BNB",
        explorer: "https://bscscan.com",
    },
} as const;

export type ChainKey = keyof typeof CHAINS;
