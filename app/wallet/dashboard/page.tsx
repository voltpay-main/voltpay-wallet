"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loadWallet } from "@/lib/wallet/storage";
import { getWallet } from "@/lib/wallet/provider";
import { getVLTBalance } from "@/lib/wallet/balances";
import { getNativeBalance } from "@/lib/wallet/nativeBalance";
import { CHAINS, ChainKey } from "@/lib/chains";

type StoredWallet = {
    address: string;
    privateKey: string;
};

export default function DashboardPage() {
    const router = useRouter();

    const [stored, setStored] = useState<StoredWallet | null>(null);
    const [chain, setChain] = useState<ChainKey>("ETH");
    const [vlt, setVlt] = useState("0");
    const [native, setNative] = useState("0");

    // Load wallet from localStorage (browser only)
    useEffect(() => {
        const w = loadWallet();
        if (!w) {
            router.push("/wallet");
            return;
        }
        setStored(w);
    }, [router]);

    // Load balances when wallet or chain changes
    useEffect(() => {
        if (!stored) return;

        const wallet = getWallet(stored.privateKey, chain);

        getVLTBalance(wallet, chain).then(setVlt);
        getNativeBalance(wallet).then(setNative);
    }, [stored, chain]);

    // While redirecting / loading
    if (!stored) return null;

    return (
        <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Wallet</h1>

            {/* Address */}
            <p className="text-sm mb-4 break-all">
                Address: {stored.address}
            </p>

            {/* Network selector */}
            <select
                value={chain}
                onChange={(e) => setChain(e.target.value as ChainKey)}
                className="w-full mb-4 bg-black border border-white/20 p-2 rounded"
            >
                {Object.keys(CHAINS).map((key) => (
                    <option key={key} value={key}>
                        {CHAINS[key as ChainKey].name}
                    </option>
                ))}
            </select>

            {/* VLT balance */}
            <div className="border border-white/10 p-4 rounded">
                <p className="text-sm">VLT Balance</p>
                <p className="text-2xl font-bold">{vlt}</p>
            </div>

            {/* Native balance */}
            <div className="border border-white/10 p-4 rounded mt-4">
                <p className="text-sm">{CHAINS[chain].symbol} Balance</p>
                <p className="text-2xl font-bold">{native}</p>
            </div>

            {/* Actions */}
            <Link
                href="/wallet/send"
                className="block mt-6 text-center bg-white text-black py-2 rounded-md font-medium"
            >
                Send
            </Link>

            <Link
                href="/wallet/receive"
                className="block mt-3 text-center border border-white/30 py-2 rounded-md font-medium"
            >
                Receive
            </Link>

            <Link
                href="/wallet/reset"
                className="block mt-3 text-center text-red-500 border border-red-500/40 py-2 rounded-md font-medium"
            >
                Reset Wallet
            </Link>

            <Link
                href="/wallet/export"
                className="block mt-3 text-center text-red-400 border border-red-400/40 py-2 rounded-md font-medium"
            >
                Export Private Key
            </Link>

        </main>
    );
}
