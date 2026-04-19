import type { RichText } from "@/models/RichText";

export interface TableBlock {
  object: "block";
  type: "table";
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
    children: TableRowBlock[];
  };
}

interface TableRowBlock {
  object: "block";
  type: "table_row";
  table_row: {
    cells: Array<Array<RichText>>;
  };
}
