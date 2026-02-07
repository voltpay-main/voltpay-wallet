"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWallet } from "@/lib/wallet/core";
import { saveWallet } from "@/lib/wallet/storage";

export default function CreateWalletPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState<{
    address: string;
    mnemonic: string;
    privateKey: string;
  } | null>(null);

  const [confirmed, setConfirmed] = useState(false);

  function generate() {
    const w = createWallet();
    setWallet(w);
  }

  function continueNext() {
    if (!wallet || !confirmed) return;
    saveWallet({
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
    router.push("/wallet/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-6 rounded-xl border border-white/10">
        <h1 className="text-xl font-bold mb-4">Create Wallet</h1>

        {!wallet && (
          <button
            onClick={generate}
            className="w-full bg-white text-black py-2 rounded-md font-medium"
          >
            Generate 12-word seed
          </button>
        )}

        {wallet && (
          <>
            <div className="mb-4 p-3 bg-white/5 rounded-md text-sm">
              {wallet.mnemonic}
            </div>

            <label className="flex items-center gap-2 mb-4 text-sm">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              I saved my seed phrase
            </label>

            <button
              onClick={continueNext}
              disabled={!confirmed}
              className="w-full bg-white text-black py-2 rounded-md font-medium disabled:opacity-50"
            >
              Continue
            </button>
          </>
        )}
      </div>
    </main>
  );
}
