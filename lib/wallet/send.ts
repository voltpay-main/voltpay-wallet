import { Wallet, parseEther, Contract, parseUnits } from "ethers";

const ERC20_ABI = ["function transfer(address to, uint256 amount)"];

export async function sendNative(
    wallet: Wallet,
    to: string,
    amount: string
) {
    return wallet.sendTransaction({
        to,
        value: parseEther(amount),
    });
}

export async function sendVLT(
    wallet: Wallet,
    to: string,              // ← FIX: add `to`
    tokenAddress: string,
    amount: string,
    decimals = 18
) {
    const contract = new Contract(tokenAddress, ERC20_ABI, wallet);
    const value = parseUnits(amount, decimals);
    return contract.transfer(to, value);
}
