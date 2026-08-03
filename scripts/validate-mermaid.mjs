import { readdir, readFile, stat } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { rehype } from "rehype";
import rehypeMermaid from "rehype-mermaid";

const target = resolve(process.argv[2] ?? "src/content/blog");
const markdownFence = /^```mermaid(?:[ \t]+[^\n]*)?\r?\n([\s\S]*?)^```\s*$/gim;

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const getMarkdownFiles = async (path) => {
  const metadata = await stat(path);

  if (metadata.isFile()) {
    return path.endsWith(".md") ? [path] : [];
  }

  const entries = await readdir(path, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => getMarkdownFiles(resolve(path, entry.name))),
  );

  return files.flat();
};

const toMermaidHtml = (source) =>
  [...source.matchAll(markdownFence)]
    .map(
      (match) =>
        `<pre><code class="language-mermaid">${escapeHtml(match[1])}</code></pre>`,
    )
    .join("\n");

const validateFile = async (file) => {
  const source = await readFile(file, "utf8");
  const mermaidHtml = toMermaidHtml(source);

  if (!mermaidHtml) {
    return;
  }

  await rehype().use(rehypeMermaid).process(mermaidHtml);
};

const files = await getMarkdownFiles(target);
const failures = [];

for (const file of files) {
  try {
    await validateFile(file);
  } catch (error) {
    failures.push(`${relative(process.cwd(), file)}\n${error.message}`);
  }
}

if (failures.length > 0) {
  console.error(`Mermaid validation failed:\n\n${failures.join("\n\n")}`);
  process.exitCode = 1;
} else {
  console.log(
    `Validated Mermaid diagrams in ${files.length} Markdown file(s).`,
  );
}
