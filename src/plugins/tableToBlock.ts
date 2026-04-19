import type { Root, Table } from "mdast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import type { TableBlock } from "@/models/TableBlock";
import { textChildrenToRichText } from "@/utils/textChildrenToRichText";

export const tableNodeToBlock = (node: Table): TableBlock => {
  const rows = node.children || [];
  const tableWidth = node.align ? node.align.length : 0;
  const hasColumnHeader = rows.length > 0 && rows[0].type === "tableRow";
  const hasRowHeader = false; // mdast does not support row headers

  const tableRows = rows
    .map((row) => {
      if (row.type !== "tableRow") return null;
      const cells = row.children.map((cell) => {
        if (cell.type !== "tableCell") return [];
        return textChildrenToRichText(cell.children || []);
      });
      return {
        object: "block",
        type: "table_row",
        table_row: {
          cells: cells,
        },
      };
    })
    .filter((row) => row !== null) as TableBlock["table"]["children"];

  return {
    object: "block",
    type: "table",
    table: {
      table_width: tableWidth,
      has_column_header: hasColumnHeader,
      has_row_header: hasRowHeader,
      children: tableRows,
    },
  };
};

export const tableToBlocks = () => {
  return (tree: Root) => {
    visit(
      tree,
      "table",
      (node: Table, index: number | undefined, parent: Parent | undefined) => {
        if (!parent || typeof index !== "number") return;
        parent.children[index] = tableNodeToBlock(node);
      },
    );
  };
};
