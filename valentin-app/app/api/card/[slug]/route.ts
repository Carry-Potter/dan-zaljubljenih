import { NextResponse } from "next/server";
import { createCardSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const card = await prisma.card.findUnique({
    where: { slug },
    select: {
      name: true,
      message: true,
      signature: true,
      highlight: true,
      imageUrl: true,
      heartColor: true,
    },
  });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(card);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const card = await prisma.card.findUnique({ where: { slug } });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const body = await request.json();
    const parsed = createCardSchema.safeParse(body);

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.errors.forEach((e) => {
        const path = e.path[0] as string;
        if (path && !errors[path]) errors[path] = e.message;
      });
      return NextResponse.json({ errors }, { status: 400 });
    }

    const data = parsed.data;
    await prisma.card.update({
      where: { slug },
      data: {
        name: data.name,
        message: data.message,
        signature: data.signature,
        highlight: data.highlight,
        imageUrl: data.imageUrl ?? null,
        heartColor: data.heartColor ?? null,
      },
    });

    return NextResponse.json({ slug });
  } catch (e) {
    console.error("Update card error:", e);
    return NextResponse.json(
      { error: "Greška pri izmeni čestitke." },
      { status: 500 }
    );
  }
}
