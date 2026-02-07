"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

import { loadWallet } from "@/lib/wallet/storage";

export default function ReceivePage() {
    const router = useRouter();
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        const w = loadWallet();
        if (!w) {
            router.push("/wallet");
            return;
        }
        setAddress(w.address);
    }, [router]);

    function copy() {
        navigator.clipboard.writeText(address);
        alert("Address copied");
    }

    if (!address) return null;

    return (
        <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">

            <Link
                href="/wallet/dashboard"
                className="inline-block mb-4 text-sm text-white/60 hover:text-white"
            >
                ← Back to Wallet
            </Link>

            <h1 className="text-xl font-bold mb-4">Receive</h1>

            <div className="bg-white p-4 rounded flex justify-center mb-4">
                <QRCodeCanvas value={address} size={200} />
            </div>

            <div className="border border-white/20 p-3 rounded break-all text-sm mb-4">
                {address}
            </div>

            <button
                onClick={copy}
                className="w-full bg-white text-black py-2 rounded-md font-medium"
            >
                Copy address
            </button>
        </main>
    );
}
