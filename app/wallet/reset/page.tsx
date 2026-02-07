"use client";

import { useRouter } from "next/navigation";
import { resetWallet } from "@/lib/wallet/storage";

export default function ResetWalletPage() {
    const router = useRouter();

    function confirmReset() {
        const ok = confirm(
            "This will permanently delete your wallet from this browser.\n\nMake sure you have saved your seed phrase.\n\nThis action cannot be undone."
        );

        if (!ok) return;

        resetWallet();
        router.push("/wallet");
    }

    return (
        <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4 text-red-500">
                Reset Wallet
            </h1>

            <p className="text-sm text-white/80 mb-6">
                This will remove your wallet from this browser.
                <br />
                <br />
                VoltPay cannot recover your wallet.
                Make sure you have backed up your seed phrase.
            </p>

            <button
                onClick={confirmReset}
                className="w-full bg-red-600 text-white py-2 rounded-md font-medium"
            >
                Delete Wallet
            </button>
        </main>
    );
}
