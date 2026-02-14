# Deploy na Vercel

Projekat koristi **PostgreSQL** na Vercel-u (SQLite ne radi u serverless okruženju). Koraci:

---

## 1. Baza: Neon (besplatno)

1. Otvori [neon.tech](https://neon.tech) i prijavi se (GitHub).
2. **New Project** → ime npr. `valentin` → **Create**.
3. Na projektu otvori **Connection string** i kopiraj **URI** (izgleda ovako):
   ```txt
   postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. Sačuvaj ga – trebaće za Vercel.

---

## 2. Repozitorijum na GitHub-u

Ako već nemaš repo:

```bash
cd valentin-app
git init
git add .
git commit -m "Ready for Vercel"
```

Na GitHub-u: **New repository** → npr. `dan-zaljubljenih` → ne dodavaj README. Zatim:

```bash
git remote add origin https://github.com/TVOJ_USER/dan-zaljubljenih.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy na Vercel

1. Idi na [vercel.com](https://vercel.com) i prijavi se (GitHub).
2. **Add New** → **Project**.
3. **Import** repozitorijum (npr. `dan-zaljubljenih`).
4. **Root Directory**: ostavi prazno ako je ceo projekat u root-u; ako je u podfolderu (npr. `valentin-app`), unesi `valentin-app`.
5. **Environment Variables** – dodaj:
   - **Name:** `DATABASE_URL`
   - **Value:** Neon URI (onaj iz koraka 1).
6. Klikni **Deploy**.

Prvi build će pokrenuti `prisma db push` i kreirati tabele u Neon bazi.

---

## 4. Posle deploy-a

- Aplikacija će biti na domenu tipa: `tvoj-projekat.vercel.app`.
- Linkovi do čestitki: `https://tvoj-projekat.vercel.app/card/abc123...`.

Ako želiš svoj domen: **Project** → **Settings** → **Domains** → dodaj domen.

---

## Lokalni rad sa PostgreSQL

Ako koristiš istu Neon bazu i lokalno, u `.env` stavi:

```env
DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

Zatim:

```bash
npx prisma db push
npm run dev
```

Ako i dalje želiš **SQLite samo lokalno**, u `prisma/schema.prisma` stavi `provider = "sqlite"` i u `.env` koristi `file:./dev.db`. Na Vercel-u mora ostati **PostgreSQL** (Neon).
