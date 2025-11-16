// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import aws from "astro-sst";

// https://astro.build/config
export default defineConfig({
  output: "server", // Enable SSR
  adapter: aws(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
