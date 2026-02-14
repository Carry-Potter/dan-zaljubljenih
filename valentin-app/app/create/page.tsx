import { Suspense } from "react";
import Link from "next/link";
import { CardForm } from "@/components/CardForm";

export const metadata = {
  title: "Kreiraj čestitku – Dan zaljubljenih",
  description: "Popuni formu i kreiraj personalizovanu Valentinovo čestitku.",
};

export default function CreatePage() {
  return (
    <main className="min-h-screen py-12 px-4 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-zinc-600 hover:text-zinc-900 mb-8 text-sm"
        >
          ← Nazad
        </Link>
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">
          Kreiraj čestitku
        </h1>
        <p className="text-zinc-600 mb-8">
          Popuni polja ispod. Sva polja su opciona.
        </p>
        <Suspense fallback={<div className="max-w-lg mx-auto py-8 text-center text-zinc-600">Učitavanje...</div>}>
          <CardForm />
        </Suspense>
      </div>
    </main>
  );
}
