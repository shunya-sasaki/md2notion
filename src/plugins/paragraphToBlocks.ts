import type { Paragraph, Root } from "mdast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import { textChildrenToRichText } from "@/utils/textChildrenToRichText";

export const paragraphToBlocks = () => {
  return (tree: Root) => {
    visit(
      tree,
      "paragraph",
      (
        node: Paragraph,
        index: number | undefined,
        parent: Parent | undefined,
      ) => {
        if (parent == null || index == null) return;
        const children = node.children || [];
        const rich = textChildrenToRichText(children);
        const block = {
          object: "block",
          type: "paragraph",
          paragraph: { rich_text: rich },
        };
        parent.children[index] = block;
      },
    );
  };
};
