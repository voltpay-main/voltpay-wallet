import { JsonRpcProvider, Wallet } from "ethers";
import { CHAINS, ChainKey } from "@/lib/chains";

export function getWallet(privateKey: string, chain: ChainKey) {
    const provider = new JsonRpcProvider(CHAINS[chain].rpc);
    return new Wallet(privateKey, provider);
}
