import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pisarz = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/pisarz" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),
    }),
});

const programista = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/programista" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),
    }),
});

export const collections = { pisarz, programista };
