"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loadWallet } from "@/lib/wallet/storage";

export default function ExportPrivateKeyPage() {
    const router = useRouter();
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const w = loadWallet();
        if (!w) {
            router.push("/wallet");
            return;
        }
        setPrivateKey(w.privateKey);
    }, [router]);

    function copy() {
        if (!privateKey) return;
        navigator.clipboard.writeText(privateKey);
        alert("Private key copied");
    }

    if (!privateKey) return null;

    return (
        <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
            <Link
                href="/wallet/dashboard"
                className="inline-block mb-4 text-sm text-white/60 hover:text-white"
            >
                ← Back to Wallet
            </Link>

            <h1 className="text-xl font-bold mb-4 text-red-500">
                Export Private Key
            </h1>

            <p className="text-sm text-white/80 mb-4">
                Your private key gives full control over your funds.
                <br />
                <br />
                Anyone with this key can steal your assets.
            </p>

            <label className="flex items-center gap-2 mb-4 text-sm">
                <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
                I understand the risks
            </label>

            {confirmed && (
                <>
                    <div className="border border-red-500/40 p-3 rounded break-all text-sm mb-4">
                        {privateKey}
                    </div>

                    <button
                        onClick={copy}
                        className="w-full bg-red-600 text-white py-2 rounded-md font-medium"
                    >
                        Copy private key
                    </button>
                </>
            )}
        </main>
    );
}
