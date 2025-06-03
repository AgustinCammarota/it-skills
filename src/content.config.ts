import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const founders = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/collections/founders" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    link: z.string().url(),
    linkTitle: z.string(),
  }),
});

export const collections = { founders };
