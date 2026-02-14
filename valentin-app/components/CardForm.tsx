"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CreateCardInput } from "@/lib/validations";

const INITIAL: CreateCardInput = {
  name: "",
  message: "",
  signature: "",
  highlight: "",
  imageUrl: "",
  heartColor: "",
};

export function CardForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [form, setForm] = useState<CreateCardInput>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateCardInput | "_", string>>>({});
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(!!slug);

  useEffect(() => {
    if (!slug) {
      setLoadingForm(false);
      return;
    }
    fetch(`/api/card/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setForm({
            name: data.name ?? "",
            message: data.message ?? "",
            signature: data.signature ?? "",
            highlight: data.highlight ?? "",
            imageUrl: data.imageUrl ?? "",
            heartColor: data.heartColor ?? "",
          });
        }
        setLoadingForm(false);
      })
      .catch(() => setLoadingForm(false));
  }, [slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateCardInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const url = slug ? `/api/card/${slug}` : "/api/create";
    const method = slug ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors((data.errors as Record<string, string>) ?? { _: data.error ?? (slug ? "Greška pri izmeni." : "Greška pri kreiranju.") });
        return;
      }
      router.push(`/create/success?slug=${encodeURIComponent(data.slug)}`);
    } catch {
      setErrors({ _: "Greška u mreži. Pokušajte ponovo." });
    } finally {
      setLoading(false);
    }
  };

  if (loadingForm) {
    return (
      <div className="max-w-lg mx-auto py-8 text-center text-zinc-600">
        Učitavanje čestitke...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
      {slug && (
        <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          Režim izmene – menjaj polja i klikni „Sačuvaj izmene”.
        </p>
      )}
      {errors._ && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
          {errors._}
        </p>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
          Ime partnera (opciono)
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder='npr. "Tanja, Sanja, Nikola, Milena, ..."'
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      <div>
               <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1">
          Poruka (opciono)
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="npr. Ako postoji mesto gde se osećam potpuno sigurno – to je u tvom zagrljaju."
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-y"
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>
      <div>
        <label htmlFor="highlight" className="block text-sm font-medium text-zinc-700 mb-1">
          Istaknuta rečenica (na sredini, opciono)
        </label>
        <input
          id="highlight"
          name="highlight"
          value={form.highlight}
          onChange={handleChange}
          placeholder='npr. Srećan Dan zaljubljenih, ljubavi moja."'
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        {errors.highlight && <p className="mt-1 text-sm text-red-500">{errors.highlight}</p>}
      </div>
      <div>
        <label htmlFor="signature" className="block text-sm font-medium text-zinc-700 mb-1">
          Potpis (opciono)
        </label>
        <input
          id="signature"
          name="signature"
          value={form.signature}
          onChange={handleChange}
          placeholder='npr. "Tvoj obožavalac"'
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        {errors.signature && <p className="mt-1 text-sm text-red-500">{errors.signature}</p>}
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-700 mb-1">
          URL slike (markica, opciono)
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={form.imageUrl ?? ""}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}
      </div>
      <div>
        <label htmlFor="heartColor" className="block text-sm font-medium text-zinc-700 mb-1">
          Boja srca (opciono, npr. #b91c1c)
        </label>
        <div className="flex gap-2 items-center">
          <input
            id="heartColor"
            name="heartColor"
            type="text"
            value={form.heartColor ?? ""}
            onChange={handleChange}
            placeholder="#b91c1c"
            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <input
            type="color"
            value={form.heartColor && /^#[0-9A-Fa-f]{6}$/.test(form.heartColor) ? form.heartColor : "#b91c1c"}
            onChange={(e) => setForm((p) => ({ ...p, heartColor: e.target.value }))}
            className="w-10 h-10 rounded border border-zinc-300 cursor-pointer"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {loading ? (slug ? "Čuvanje..." : "Kreiranje...") : slug ? "Sačuvaj izmene" : "Kreiraj čestitku"}
      </button>
    </form>
  );
}
