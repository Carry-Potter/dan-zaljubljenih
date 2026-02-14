import { NextResponse } from "next/server";
import { createCardSchema } from "@/lib/validations";
import { createSlug } from "@/lib/slug";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
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
    let slug = createSlug();
    let exists = await prisma.card.findUnique({ where: { slug } });
    while (exists) {
      slug = createSlug();
      exists = await prisma.card.findUnique({ where: { slug } });
    }

    await prisma.card.create({
      data: {
        slug,
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
    console.error("Create card error:", e);
    return NextResponse.json(
      { error: "Greška pri čuvanju čestitke." },
      { status: 500 }
    );
  }
}
