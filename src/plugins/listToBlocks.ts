import type { List, Root } from "mdast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import { listItemChildrenToRichText } from "@/utils/listItemChildrenToRichText";

export const listToBlocks = () => {
  return (tree: Root) => {
    const targets: { node: List; index: number; parent: Parent }[] = [];

    visit(tree, "list", (node: List, index, parent) => {
      if (parent == null || index == null) return;
      targets.push({ node, index, parent });
    });

    targets
      .sort((a, b) => b.index - a.index)
      .forEach(({ node, index, parent }) => {
        const children = node.children ?? [];
        const ordered = node.ordered ?? false;
        const items = listItemChildrenToRichText(children, ordered);
        parent.children.splice(index, 1, ...items);
      });
  };
};
