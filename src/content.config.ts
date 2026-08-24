import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    showUpdatedAt: z.boolean().default(false),
    category: z.string().trim().min(1),
    tags: z.array(z.string().min(1)).default([]),
    draft: z.boolean().optional(),
    cover: z.string().min(1).optional(),
  }),
});

export const collections = { blog };
