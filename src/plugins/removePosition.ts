import type { Root } from "mdast";

const stripPositionsInPlace = (node: unknown): void => {
  if (Array.isArray(node)) {
    for (const child of node) {
      stripPositionsInPlace(child);
    }
    return;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if ("position" in obj) {
      delete (obj as { position?: unknown }).position;
    }
    for (const key of Object.keys(obj)) {
      stripPositionsInPlace(obj[key]);
    }
  }
};

export const removePosition = () => {
  return (tree: Root) => {
    stripPositionsInPlace(tree);
  };
};
