import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-zinc-50">
      <h1 className="text-2xl font-bold text-zinc-800">Čestitka nije pronađena</h1>
      <p className="text-zinc-600 mt-2">Link je neispravan ili je čestitka uklonjena.</p>
      <Link href="/" className="mt-6 text-rose-600 hover:underline">
        Nazad na početnu
      </Link>
    </main>
  );
}
