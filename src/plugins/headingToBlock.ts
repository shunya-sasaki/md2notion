import type { Heading, Root } from "mdast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import type { HeadingBlock } from "@/models/HeadingBlock";
import { textChildrenToRichText } from "@/utils/textChildrenToRichText";

export const headingToBlocks = () => {
  return (tree: Root) => {
    visit(
      tree,
      "heading",
      (
        node: Heading,
        index: number | undefined,
        parent: Parent | undefined,
      ) => {
        if (!parent || typeof index !== "number") return;
        const children = node.children || [];
        const depth = node.depth as 1 | 2 | 3 | 4 | 5 | 6;
        const rich = textChildrenToRichText(children);
        const block: HeadingBlock = {
          object: "block",
          type: `heading_${depth}`,
          [`heading_${depth}`]: { rich_text: rich },
        };
        parent.children[index] = block;
      },
    );
  };
};
