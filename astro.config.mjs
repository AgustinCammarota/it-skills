// @ts-check
import { defineConfig, fontProviders, envField } from "astro/config";

import netlify from "@astrojs/netlify";
import svelte from "@astrojs/svelte";
import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://itskills.com.ar",
  output: "static",
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true,
  },
  image: {
    experimentalLayout: "constrained",
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    fallback: {
      en: "es",
    },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },
  adapter: netlify({
    imageCDN: true,
    cacheOnDemandPages: true,
    edgeMiddleware: true,
  }),
  integrations: [
    svelte(),
    partytown({
      config: {
        debug: false,
        forward: ["dataLayer.push"],
      },
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
        },
      },
    }),
  ],
  server: {
    allowedHosts: [
      "itskills.com.ar",
      "www.itskills.com.ar",
      "it-skills.netlify.app",
      "develop--it-skills.netlify.app",
    ],
  },
  env: {
    schema: {
      PUBLIC_AUTHOR_NAME: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_PAGE_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_COMPANY_NAME: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_COMPANY_EMAIL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_COMPANY_PHONE: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_COMPANY_LINKEDIN: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
    },
  },
  experimental: {
    responsiveImages: true,
    clientPrerender: true,
    fonts: [
      {
        provider: fontProviders.fontsource(),
        weights: ["100 800", "bold"],
        styles: ["normal", "italic"],
        fallbacks: ["sans-serif"],
        name: "Comfortaa",
        cssVariable: "--font-comfortaa",
      },
    ],
  },
});
