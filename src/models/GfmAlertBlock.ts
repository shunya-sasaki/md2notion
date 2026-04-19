import type { RichText } from "@/models/RichText";
import type { GfmAlertBgColorValue, GfmAlertIconValue } from "@/types/GfmAlert";
import { Equation } from "./Equation";

export interface GfmAlertBlock {
  object: "block";
  type: "callout";
  callout: {
    rich_text: Array<RichText | Equation>;
    icon: {
      emoji: GfmAlertIconValue;
    };
    color: GfmAlertBgColorValue;
    children?: any[];
  };
}
