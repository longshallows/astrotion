import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

import { BASE_PATH, CUSTOM_DOMAIN } from "./src/constants";
import astrotion from "./src/integrations";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: getSite(),
  base: BASE_PATH,
  integrations: [astrotion(), sitemap(), robotsTxt()],
  vite: {
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
    plugins: [tailwindcss()]
  },
  trailingSlash: "always",
});

function getSite() {
  if (CUSTOM_DOMAIN) {
    return new URL(BASE_PATH, `https://${CUSTOM_DOMAIN}`).toString();
  }

  if (process.env.VERCEL && process.env.VERCEL_URL) {
    return new URL(BASE_PATH, `https://${process.env.VERCEL_URL}`).toString();
  }

  if (process.env.CF_PAGES) {
    if (process.env.CF_PAGES_BRANCH !== "main") {
      return new URL(BASE_PATH, process.env.CF_PAGES_URL).toString();
    }

    return new URL(
      BASE_PATH,
      `https://${new URL(process.env.CF_PAGES_URL).host
        .split(".")
        .slice(1)
        .join(".")}`,
    ).toString();
  }

  return;
}
