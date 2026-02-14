import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CardReveal } from "@/components/CardReveal";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = await prisma.card.findUnique({
    where: { slug },
  });
  if (!card) return { title: "Čestitka nije pronađena" };
  const title = `Čestitka za ${card.name} – Dan zaljubljenih`;
  const description = card.highlight || "Personalizovana čestitka za Dan zaljubljenih.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function CardPage({ params }: PageProps) {
  const { slug } = await params;
  const card = await prisma.card.findUnique({
    where: { slug },
  });

  if (!card) notFound();

  prisma.card
    .update({
      where: { id: card.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch(() => {});

  return (
    <CardReveal
      card={{
        name: card.name,
        message: card.message,
        signature: card.signature,
        highlight: card.highlight,
        imageUrl: card.imageUrl,
        heartColor: card.heartColor,
      }}
    />
  );
}
