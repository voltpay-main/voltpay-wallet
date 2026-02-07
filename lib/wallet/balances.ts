import { Contract, formatUnits } from "ethers";
import { TOKENS } from "@/lib/tokens";

const ERC20_ABI = ["function balanceOf(address) view returns (uint256)"];

export async function getVLTBalance(wallet, chain: "ETH" | "BSC") {
    const token = TOKENS.VLT[chain];
    if (!token) return "0";

    try {
        const contract = new Contract(
            token.address,
            ERC20_ABI,
            wallet
        );

        const raw = await contract.balanceOf(wallet.address);
        return formatUnits(raw, token.decimals);
    } catch (err) {
        console.warn(`VLT not available on ${chain}`);
        return "0";
    }
}
