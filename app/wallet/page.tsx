"use client";

import Link from "next/link";

export default function WalletHome() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm p-6 rounded-xl border border-white/10">
        <h1 className="text-2xl font-bold mb-2">VoltPay Wallet</h1>

        <p className="text-sm text-gray-400 mb-6">
          Non-custodial web wallet. Keys stay in your browser.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/wallet/create"
            className="text-center bg-white text-black py-2 rounded-md font-medium"
          >
            Create Wallet
          </Link>

          <Link
            href="/wallet/import"
            className="text-center border border-white/20 py-2 rounded-md"
          >
            Import Wallet
          </Link>
        </div>
      </div>
    </main>
  );
}
