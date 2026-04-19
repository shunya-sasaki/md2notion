import type { RichText } from "@/models/RichText";

export interface ParagraphBlock {
  object: "block";
  type: "paragraph";
  paragraph: {
    rich_text: RichText[];
  };
}
