import type { RichText } from "@/models/RichText";

export interface HeadingBlock {
  object: "block";
  type: `heading_${1 | 2 | 3 | 4 | 5 | 6}`;
  heading_1?: { rich_text: RichText[] };
  heading_2?: { rich_text: RichText[] };
  heading_3?: { rich_text: RichText[] };
  heading_4?: { rich_text: RichText[] };
  heading_5?: { rich_text: RichText[] };
  heading_6?: { rich_text: RichText[] };
}
