# Dan zaljubljenih – Full-stack aplikacija

Next.js 14 (App Router) + TypeScript aplikacija za kreiranje personalizovanih online čestitki za Dan zaljubljenih. Interaktivna 3D koverta sa animacijom otvaranja (hover).

## Šta aplikacija radi

- **Landing** – početna stranica sa dugmetom "Kreiraj svoju čestitku" i kratkim uputstvom.
- **Forma** – korisnik unosi ime partnera, poruku, potpis, istaknutu rečenicu; opciono URL slike (markica) i boju srca. Klik na "Kreiraj čestitku" čuva podatke u bazu i generiše jedinstveni link.
- **Čestitka** – ruta `/card/[slug]` učitava podatke iz baze i prikazuje isti dizajn koverte sa custom tekstom. Hover animacija ostaje ista.
- **Nakon kreiranja** – prikazuje se link, dugme "Kopiraj link" i "Podeli" (Web Share API ako postoji).

## Struktura projekta

```
valentin-app/
├── app/
│   ├── layout.tsx          # Root layout, metadata
│   ├── page.tsx             # Landing stranica
│   ├── globals.css          # Tailwind + fontovi
│   ├── create/
│   │   ├── page.tsx         # Forma za kreiranje čestitke
│   │   └── success/
│   │       └── page.tsx     # Stranica nakon kreiranja (link, kopiraj, podeli)
│   ├── card/
│   │   └── [slug]/
│   │       └── page.tsx     # Dinamička ruta – prikaz čestitke po slug-u
│   ├── api/
│   │   └── create/
│   │       └── route.ts     # POST API za kreiranje kartice (Zod + Prisma)
│   └── not-found.tsx       # 404 stranica
├── components/
│   ├── ValentineCard.tsx   # React komponenta čestitke (refaktorisan HTML template)
│   └── CardForm.tsx        # Forma sa validacijom i submit logikom
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── slug.ts             # Generisanje slug-a (nanoid)
│   └── validations.ts      # Zod šema za formu
├── prisma/
│   └── schema.prisma       # Model Card, SQLite
├── .env                    # DATABASE_URL (nije u git-u)
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Kako pokrenuti projekat lokalno

1. **Kloniraj / otvori projekat**  
   Npr. `cd valentin-app`

2. **Instaliraj zavisnosti**
   ```bash
   npm install
   ```

3. **Baza podataka (SQLite)**  
   Kreiraj fajl `.env` u korenu projekta (možeš kopirati iz `.env.example`):
   ```env
   DATABASE_URL="file:./dev.db"
   ```
   Zatim primeni šemu na bazu:
   ```bash
   npx prisma db push
   ```
   (Ovo kreira `prisma/dev.db` ako ne postoji.)

4. **Pokreni dev server**
   ```bash
   npm run dev
   ```
   Aplikacija je na [http://localhost:3000](http://localhost:3000).

5. **Korisčenje**
   - Početna: [http://localhost:3000](http://localhost:3000)
   - Kreiranje čestitke: [http://localhost:3000/create](http://localhost:3000/create)
   - Primer čestitke (nakon kreiranja): `http://localhost:3000/card/<slug>`

## Skripte

| Komanda           | Opis                          |
|-------------------|-------------------------------|
| `npm run dev`     | Pokreće Next.js dev server    |
| `npm run build`   | Production build               |
| `npm run start`   | Pokreće production server     |
| `npm run lint`    | ESLint                        |
| `npx prisma db push` | Primenjuje šemu na bazu   |
| `npx prisma studio`  | Otvara Prisma Studio (pregled tabele) |

## Tehnički detalji

- **Next.js 14** (App Router), **TypeScript**, **TailwindCSS**
- **Prisma** + **SQLite** (development); za produkciju možeš koristiti PostgreSQL (promeni `provider` i `url` u `prisma/schema.prisma` i dodaj `DATABASE_URL` na Vercel).
- **Zod** za validaciju forme; **nanoid** za jedinstveni slug.
- **ValentineCard** – sve tekstualne vrednosti dolaze iz props-a (name, message, signature, highlight, imageUrl, heartColor).
- **SEO**: metadata i Open Graph na layout-u i na `/card/[slug]`.
- **Bonus**: broj otvaranja (`viewCount`) se uvećava pri učitavanju `/card/[slug]`. Opciono možeš dodati `expiresAt` (npr. 30 dana) i filtrirati u query-ju.

## Deploy na Vercel

1. Repo poveži sa Vercelom.
2. U Environment Variables dodaj `DATABASE_URL`. Za PostgreSQL (npr. Vercel Postgres ili Neon):  
   `postgresql://...`
3. U Build Command ostavi `npm run build` (ili `next build`).
4. Prisma: u Vercel build-u se automatski pokreće `prisma generate` (postinstall). Za migracije na produkciju koristi `prisma migrate deploy` u build komandi ili jednom ručno na bazi.

Ako koristiš SQLite u dev-u, na Vercel-u moraš koristiti neku drugu bazu (npr. PostgreSQL) jer se fajl sistem ne persisti.
