export type ChainKey = "ETH" | "BSC";

export const CHAINS: Record<
    ChainKey,
    {
        name: string;
        rpc: string;
        symbol: string;
        chainId: number;
    }
> = {
    ETH: {
        name: "Ethereum",
        rpc: "https://rpc.ankr.com/eth",
        symbol: "ETH",
        chainId: 1,
    },
    BSC: {
        name: "BNB Smart Chain",
        rpc: "https://rpc.ankr.com/bsc",
        symbol: "BNB",
        chainId: 56,
    },
};
