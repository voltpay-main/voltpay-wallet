import { Wallet, formatEther } from "ethers";

export async function getNativeBalance(wallet: Wallet): Promise<string> {
    try {
        const raw = await wallet.provider!.getBalance(wallet.address);
        return formatEther(raw);
    } catch {
        return "0";
    }
}
