const STORAGE_KEY = "voltpay_wallet";

export function saveWallet(data: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadWallet() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function resetWallet() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
