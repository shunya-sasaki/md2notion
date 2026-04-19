import type { Code, Root } from "mdast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import type { CodeBlock } from "@/models/CodeBlock";

const ALLOWED_LANGUAGES = [
  "abap",
  "arduino",
  "bash",
  "basic",
  "c",
  "clojure",
  "coffeescript",
  "c++",
  "c#",
  "css",
  "dart",
  "diff",
  "docker",
  "elixir",
  "elm",
  "erlang",
  "flow",
  "fortran",
  "f#",
  "gherkin",
  "glsl",
  "go",
  "graphql",
  "groovy",
  "haskell",
  "html",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "latex",
  "less",
  "lisp",
  "livescript",
  "lua",
  "makefile",
  "markdown",
  "markup",
  "matlab",
  "mermaid",
  "nix",
  "objective|c",
  "ocaml",
  "pascal",
  "perl",
  "php",
  "plain text",
  "powershell",
  "prolog",
  "protobuf",
  "python",
  "r",
  "reason",
  "ruby",
  "rust",
  "sass",
  "scala",
  "scheme",
  "scss",
  "shell",
  "sql",
  "swift",
  "typescript",
  "vb.net",
  "verilog",
  "vhdl",
  "visual basic",
  "webassembly",
  "xml",
  "yaml",
  "java/c/c++/c#",
];

const LANGUAGE_ALIASES: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  py: "python",
  rb: "ruby",
  rs: "rust",
  cs: "c#",
  csharp: "c#",
  cpp: "c++",
  sh: "shell",
  zsh: "shell",
  fish: "shell",
  yml: "yaml",
  tex: "latex",
  dockerfile: "docker",
  objc: "objective|c",
  "objective-c": "objective|c",
  hs: "haskell",
  kt: "kotlin",
  fs: "f#",
  fsharp: "f#",
  vb: "visual basic",
  wasm: "webassembly",
  text: "plain text",
  txt: "plain text",
  gql: "graphql",
  proto: "protobuf",
  ml: "ocaml",
  jsx: "javascript",
  tsx: "typescript",
  jsonc: "json",
};

const normalizeLanguage = (lang: string): CodeBlock["code"]["language"] => {
  const lower = lang.toLowerCase();
  const resolved = LANGUAGE_ALIASES[lower] ?? lower;
  if (ALLOWED_LANGUAGES.includes(resolved)) {
    return resolved as CodeBlock["code"]["language"];
  }
  return "plain text";
};

export const codeToBlocks = () => {
  return (tree: Root) => {
    visit(
      tree,
      "code",
      (node: Code, index: number | undefined, parent: Parent | undefined) => {
        if (!parent || typeof index !== "number") return;
        const language = normalizeLanguage(
          node.lang ? node.lang : "plain text",
        );
        if (!ALLOWED_LANGUAGES.includes(language)) {
          return;
        }
        const value = node.value;
        const CHUNK_SIZE = 2000;
        const chunks: string[] = [];
        for (let i = 0; i < value.length; i += CHUNK_SIZE) {
          chunks.push(value.slice(i, i + CHUNK_SIZE));
        }
        const block: CodeBlock = {
          object: "block",
          type: "code",
          code: {
            caption: [],
            rich_text: chunks.map((c) => ({
              type: "text",
              text: {
                content: c,
              },
            })),
            language: language,
          },
        };
        parent.children[index] = block;
      },
    );
  };
};
