import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import rehypeMermaid from "rehype-mermaid";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://namonak.github.io",
  output: "static",
  trailingSlash: "always",
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    processor: unified({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeMermaid],
    }),
  },
});
