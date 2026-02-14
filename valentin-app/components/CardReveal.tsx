"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ValentineCard } from "./ValentineCard";

type CardData = {
  name: string;
  message: string;
  signature: string;
  highlight: string;
  imageUrl: string | null;
  heartColor: string | null;
};

export function CardReveal({ card }: { card: CardData }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="error"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-[#0f0f0f] text-zinc-300 flex items-center justify-center px-6 py-12"
          >
            <div className="w-full max-w-[760px] p-8 sm:p-12">
              <h1 className="text-6xl sm:text-7xl font-normal tracking-tight text-white mb-1">
                404
              </h1>
              <h2 className="text-xl font-normal text-zinc-400 mb-5">
                Nije pronađeno
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-7 max-w-md">
                Traženi resurs nije pronađen na ovom serveru.
              </p>
              <ul className="text-[13px] text-zinc-600 mb-9 pl-5 space-y-1 list-disc">
                <li>URL adresa možda nije ispravna</li>
                <li>Resurs možda više ne postoji</li>
                <li>Pokušajte ponovo kasnije</li>
              </ul>
              <motion.button
                type="button"
                onClick={() => setRevealed(true)}
                className="font-sans text-sm bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-600/50 text-zinc-200 px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Osveži
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative min-h-screen gradient-mesh flex flex-col items-center justify-center pt-20 pb-28 px-4"
          >
            <div className="relative z-10 w-full max-w-[480px] flex-shrink-0 pt-20 md:pt-28">
              <ValentineCard
                name={card.name}
                message={card.message}
                signature={card.signature}
                highlight={card.highlight}
                imageUrl={card.imageUrl}
                heartColor={card.heartColor}
              />
            </div>
            <p className="relative z-10 mt-8 text-zinc-500 text-[10px] uppercase tracking-[0.3em] animate-pulse">
              Pređi mišem preko koverte da otvoriš
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
