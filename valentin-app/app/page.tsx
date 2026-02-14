import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 tracking-tight">
          Dan zaljubljenih
        </h1>
        <p className="text-lg text-zinc-600 leading-relaxed">
          Napravi jedinstvenu online čestitku za nekoga posebnog. Unesi poruku,
          potpis i dobij link koji možeš da podeliš.
        </p>
        <ul className="text-left text-zinc-600 space-y-2 max-w-sm mx-auto">
          <li className="flex items-center gap-2">
            <span className="text-rose-500">♥</span> Unesi ime i poruku
          </li>
          <li className="flex items-center gap-2">
            <span className="text-rose-500">♥</span> Dobij link do čestitke
          </li>
          <li className="flex items-center gap-2">
            <span className="text-rose-500">♥</span> Podeli link – otvara se 3D koverta
          </li>
        </ul>
        <div className="pt-4">
          <Link
            href="/create"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-8 rounded-xl transition-colors shadow-lg shadow-rose-200"
          >
            Kreiraj svoju čestitku
          </Link>
        </div>
      </div>
    </main>
  );
}
