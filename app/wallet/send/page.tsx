"use client";

import { useEffect, useState } from "react";
import { loadWallet } from "@/lib/wallet/storage";
import { getWallet } from "@/lib/wallet/provider";
import { sendNative, sendVLT } from "@/lib/wallet/send";
import { ChainKey } from "@/lib/chains";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SendPage() {
    const router = useRouter();
    const [stored, setStored] = useState<any>(null);

    const [chain, setChain] = useState<ChainKey>("ETH");
    const [token, setToken] = useState<"NATIVE" | "VLT">("NATIVE");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const w = loadWallet();
        if (!w) {
            router.push("/wallet");
            return;
        }
        setStored(w);
    }, []);

    async function submit() {
        try {
            setError("");
            setLoading(true);

            const wallet = getWallet(stored.privateKey, chain);

            if (token === "NATIVE") {
                await sendNative(wallet, to, amount);
            } else {
                await sendVLT(wallet, chain, to, amount);
            }

            router.push("/wallet/dashboard");
        } catch (e: any) {
            setError(e.message || "Transaction failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
            <Link
                href="/wallet/dashboard"
                className="inline-block mb-4 text-sm text-white/60 hover:text-white"
            >
                ← Back to Wallet
            </Link>

            <h1 className="text-xl font-bold mb-4">Send</h1>

            <select
                value={token}
                onChange={(e) => setToken(e.target.value as any)}
                className="w-full mb-3 bg-black border border-white/20 p-2 rounded"
            >
                <option value="NATIVE">Native</option>
                <option value="VLT">VLT</option>
            </select>

            <input
                placeholder="Recipient address"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full mb-3 bg-black border border-white/20 p-2 rounded"
            />

            <input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mb-3 bg-black border border-white/20 p-2 rounded"
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
                onClick={submit}
                disabled={loading}
                className="w-full bg-white text-black py-2 rounded-md font-medium disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send"}
            </button>
        </main>
    );
}
