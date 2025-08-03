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

const about = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/collections/about" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    link: z.string(),
    href: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

const recruiting = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/collections/recruiting" }),
  schema: z.object({
    title: z.string(),
    link: z.string(),
    href: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

export const collections = { founders, about, recruiting };
