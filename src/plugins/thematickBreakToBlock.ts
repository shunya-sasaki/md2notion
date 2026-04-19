import type { Root, ThematicBreak } from "mdast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import type { DividerBlock } from "@/models/DividerBlock";

export const thematickBreakToBlock = () => {
  return (tree: Root) => {
    visit(
      tree,
      "thematicBreak",
      (
        node: ThematicBreak,
        index: number | undefined,
        parent: Parent | undefined,
      ) => {
        if (!parent || typeof index !== "number") return;
        const block: DividerBlock = {
          object: "block",
          type: "divider",
          divider: {},
        };
        parent.children[index] = block;
      },
    );
  };
};
