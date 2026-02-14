import { z } from "zod";

export const createCardSchema = z.object({
  name: z.string().max(100, "Maksimalno 100 karaktera").default(""),
  message: z.string().max(2000, "Maksimalno 2000 karaktera").default(""),
  signature: z.string().max(100, "Maksimalno 100 karaktera").default(""),
  highlight: z.string().max(200, "Maksimalno 200 karaktera").default(""),
  imageUrl: z
    .string()
    .max(2000)
    .optional()
    .transform((s) => (s === "" || !s ? undefined : s))
    .refine(
      (s) =>
        s === undefined ||
        s.startsWith("http://") ||
        s.startsWith("https://"),
      { message: "URL mora početi sa http:// ili https://" }
    ),
  heartColor: z
    .string()
    .max(20)
    .optional()
    .transform((s) => (s === "" || !s ? undefined : s)),
});

export type CreateCardInput = z.infer<typeof createCardSchema>;
