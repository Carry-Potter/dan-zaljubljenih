"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { ValentineCard } from "@/components/ValentineCard";

type CardData = {
  name: string;
  message: string;
  signature: string;
  highlight: string;
  imageUrl: string | null;
  heartColor: string | null;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [copied, setCopied] = useState(false);
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    fetch(`/api/card/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setCard(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL ?? "";
  const cardUrl = slug ? `${baseUrl}/card/${slug}` : "";

  const copyLink = useCallback(async () => {
    if (!cardUrl) return;
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = cardUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [cardUrl]);

  const share = useCallback(async () => {
    if (!cardUrl || !navigator.share) {
      copyLink();
      return;
    }
    try {
      await navigator.share({
        title: "Čestitka za Dan zaljubljenih",
        text: "Poslao/la sam ti čestitku!",
        url: cardUrl,
      });
    } catch {
      copyLink();
    }
  }, [cardUrl, copyLink]);

  if (!slug) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-zinc-600">Nema podataka o čestitki.</p>
        <Link href="/create" className="mt-4 text-rose-600 hover:underline">
          Kreiraj novu čestitku
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-rose-50 to-white">
        <p className="text-zinc-600">Učitavanje...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12 bg-gradient-to-b from-rose-50 to-white">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-zinc-800 text-center">
          Čestitka je kreirana
        </h1>

        {/* Prikaz kako će čestitka izgledati */}
        <section className="flex flex-col items-center">
          <p className="text-sm text-zinc-600 mb-4">Ovako će izgledati:</p>
          <div className="w-full max-w-[320px] [&_.group]:pointer-events-auto bg-[#111] rounded-xl p-6 flex items-center justify-center">
            {card ? (
              <div className="scale-75 origin-center">
                <ValentineCard
                  name={card.name}
                  message={card.message}
                  signature={card.signature}
                  highlight={card.highlight}
                  imageUrl={card.imageUrl}
                  heartColor={card.heartColor}
                />
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">Nije moguće učitati prikaz.</p>
            )}
          </div>
          <Link
            href={`/create?slug=${encodeURIComponent(slug)}`}
            className="mt-4 inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium text-sm"
          >
            Izmeni čestitku
          </Link>
        </section>

        <section className="text-center space-y-4">
          <p className="text-zinc-600">Podeli ovaj link da neko vidi čestitku:</p>
          <a
            href={cardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-rose-600 hover:underline break-all text-sm"
          >
            {cardUrl}
          </a>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={copyLink}
              className="px-5 py-2.5 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 font-medium text-sm"
            >
              {copied ? "Kopirano!" : "Kopiraj link"}
            </button>
            <button
              type="button"
              onClick={share}
              className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm"
            >
              Podeli
            </button>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <Link
            href={`/card/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900"
          >
            Otvori čestitku u novom tabu →
          </Link>
          <Link href="/create" className="text-rose-600 hover:underline">
            Kreiraj još jednu čestitku
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CreateSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Učitavanje...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
