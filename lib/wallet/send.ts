import { Contract, parseEther, parseUnits } from "ethers";
import { TOKENS } from "@/lib/tokens";

const ERC20_ABI = ["function transfer(address to, uint256 amount)"];

export async function sendNative(wallet, to: string, amount: string) {
    const tx = await wallet.sendTransaction({
        to,
        value: parseEther(amount),
    });

    return tx.wait();
}

export async function sendVLT(
    wallet,
    chain: "ETH" | "BSC",
    to: string,
    amount: string
) {
    const token = TOKENS.VLT[chain];
    if (!token) throw new Error("VLT not available on this chain");

    const contract = new Contract(token.address, ERC20_ABI, wallet);
    const tx = await contract.transfer(
        to,
        parseUnits(amount, token.decimals)
    );

    return tx.wait();
}
