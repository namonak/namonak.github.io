import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://namonak.github.io",
  output: "static",
  trailingSlash: "always",
  markdown: {
    processor: unified({ remarkPlugins: [remarkGfm] }),
  },
});
