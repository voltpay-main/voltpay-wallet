import { formatEther } from "ethers";

export async function getNativeBalance(wallet) {
    try {
        const raw = await wallet.provider.getBalance(wallet.address);
        return formatEther(raw);
    } catch (err) {
        console.warn("Native balance unavailable");
        return "0";
    }
}
