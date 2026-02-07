import { Wallet, JsonRpcProvider, Contract, formatUnits } from "ethers";
import { TOKENS } from "@/lib/wallet/tokens";
import { CHAINS } from "@/lib/wallet/chains";

const ERC20_ABI = ["function balanceOf(address) view returns (uint256)"];

export async function getVLTBalance(
    wallet: Wallet,
    chain: "ETH" | "BSC"
): Promise<string> {
    const token = TOKENS.VLT[chain];
    if (!token) return "0";

    const provider = new JsonRpcProvider(CHAINS[chain].rpc);
    const contract = new Contract(token.address, ERC20_ABI, provider);

    const balance = await contract.balanceOf(wallet.address);
    return formatUnits(balance, token.decimals);
}
