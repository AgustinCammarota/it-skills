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
  image: {
    domains: [
      "http://localhost:1337",
      "https://dependable-nature-bc7f4e7cee.strapiapp.com",
    ],
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
      PUBLIC_CALENDLY_WIDGET: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_CALENDLY_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_NETLIFY_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_RECAPTCHA_SITE_KEY: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_API_RECAPTCHA: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_STRAPI_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      NETLIFY_EMAILS_PROVIDER: envField.string({
        context: "server",
        access: "secret",
      }),
      NETLIFY_EMAILS_PROVIDER_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      NETLIFY_EMAILS_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      NETLIFY_EMAILS_MAILGUN_DOMAIN: envField.string({
        context: "server",
        access: "secret",
      }),
      NETLIFY_EMAILS_MAILGUN_HOST_REGION: envField.string({
        context: "server",
        access: "secret",
      }),
      RECAPTCHA_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      STRAPI_TOKEN: envField.string({
        context: "server",
        access: "secret",
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
