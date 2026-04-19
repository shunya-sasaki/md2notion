import type { RichText } from "@/models/RichText";
import { Equation } from "./Equation";

export interface BlockquoteBlock {
  object: "block";
  type: "quote";
  quote: { rich_text: Array<RichText| Equation> };
}
