import type { Blockquote, Root } from "mdast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import type { BlockquoteBlock } from "@/models/BlockquoteBlock";
import type { GfmAlertBlock } from "@/models/GfmAlertBlock";
import type { RichText } from "@/models/RichText";
import { type GfmAlert, GfmAlertBgColor, GfmAlertIcon } from "@/types/GfmAlert";
import { listItemChildrenToRichText } from "@/utils/listItemChildrenToRichText";
import { textChildrenToRichText } from "@/utils/textChildrenToRichText";
import { tableNodeToBlock } from "@/plugins/tableToBlock";
import { Equation } from "@/models/Equation";

export const blockquoteToBlocks = () => {
  return (tree: Root) => {
    visit(
      tree,
      "blockquote",
      (
        node: Blockquote,
        index: number | undefined,
        parent: Parent | undefined,
      ) => {
        if (!parent || typeof index !== "number") return;
        const children = node.children || [];

        let isGfmAlert = false;
        let gfmAlertType: GfmAlert = "NOTE";
        let rich: Array<RichText | Equation>|Array<RichText>| Array<Equation> = [];
        const paragraph = children[0];
        if ("children" in paragraph && "value" in paragraph.children[0]) {
          const firstChild = paragraph.children[0];
          const firstSentence = firstChild.value || "";
          const match = firstSentence.match(
            /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](:|\s*)/,
          );
          if (match) {
            // Remove the alert keyword from the first child's value
            firstChild.value = firstSentence.replace(match[0], "").trimStart();
            isGfmAlert = true;
            gfmAlertType = match[1] as GfmAlert;
            rich = textChildrenToRichText(paragraph.children || []);
          }
        } else {
          rich = [];
        }
        let blockChildren: any[] = [];
        children.slice(1).forEach((child) => {
          console.log(child.type)
          if (child.type === "paragraph") {
            const richText = textChildrenToRichText(child.children || []);
            const block = {
              object: "block",
              type: "paragraph",
              paragraph: { rich_text: richText },
            };
            blockChildren.push(block);
          } else if (child.type === "list") {
              const richTexts = listItemChildrenToRichText(
                child.children,
                child.ordered ?? false,
              );
              blockChildren = [...blockChildren, ...richTexts];
          } else if (child.type === "table") {
              blockChildren.push(tableNodeToBlock(child));
          }
        });
        let block: BlockquoteBlock | GfmAlertBlock;
        if (!isGfmAlert) {
          block = {
            object: "block",
            type: "quote",
            quote: { rich_text: rich },
          };
        } else {
          block = {
            object: "block",
            type: "callout",
            callout: {
              rich_text: rich,
              icon: { emoji: GfmAlertIcon[gfmAlertType] },
              color: GfmAlertBgColor[gfmAlertType],
              children: blockChildren,
            },
          };
        }
        parent.children[index] = block;
      },
    );
  };
};
