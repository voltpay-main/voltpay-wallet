"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { importFromMnemonic } from "@/lib/wallet/core";
import { saveWallet } from "@/lib/wallet/storage";

export default function ImportWalletPage() {
    const router = useRouter();
    const [seed, setSeed] = useState("");
    const [error, setError] = useState("");

    function submit() {
        try {
            setError("");
            const wallet = importFromMnemonic(seed);

            saveWallet({
                address: wallet.address,
                privateKey: wallet.privateKey,
            });

            router.push("/wallet/dashboard");
        } catch (e: any) {
            setError("Invalid seed phrase or private key");
        }
    }

    return (
        <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Import Wallet</h1>

            <textarea
                placeholder="Enter seed phrase or private key"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                rows={4}
                className="w-full mb-3 bg-black border border-white/20 p-2 rounded"
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
                onClick={submit}
                className="w-full bg-white text-black py-2 rounded-md font-medium"
            >
                Import
            </button>
        </main>
    );
}
