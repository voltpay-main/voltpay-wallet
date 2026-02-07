import type { ChainKey } from "./chains";

export const TOKENS: {
    VLT: Record<
        ChainKey,
        {
            address: string;
            decimals: number;
        }
    >;
} = {
    VLT: {
        ETH: {
            address: "0x0000000000000000000000000000000000000000", // TODO: replace
            decimals: 18,
        },
        BSC: {
            address: "0x0000000000000000000000000000000000000000", // TODO: replace
            decimals: 18,
        },
    },
};
