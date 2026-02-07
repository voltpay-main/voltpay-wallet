import { Wallet } from "ethers";

export function createWallet() {
  const wallet = Wallet.createRandom();

  return {
    address: wallet.address,
    mnemonic: wallet.mnemonic?.phrase as string,
    privateKey: wallet.privateKey,
  };
}

export function importFromMnemonic(input: string) {
  const value = input.trim();

  if (value.split(" ").length > 1) {
    return Wallet.fromPhrase(value);
  }

  return new Wallet(value);
}