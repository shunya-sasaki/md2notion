export type GfmAlert = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

export const GfmAlertIcon = {
  NOTE: "📝",
  TIP: "💡",
  IMPORTANT: "🔔",
  WARNING: "⚠️",
  CAUTION: "🚨",
} as const; // Added 'as const' here

export const GfmAlertBgColor = {
  NOTE: "blue_background",
  TIP: "green_background",
  IMPORTANT: "purple_background",
  WARNING: "yellow_background",
  CAUTION: "red_background",
};

// Export a type that represents the union of the emoji string values
export type GfmAlertIconValue =
  (typeof GfmAlertIcon)[keyof typeof GfmAlertIcon];

export type GfmAlertBgColorValue =
  (typeof GfmAlertBgColor)[keyof typeof GfmAlertBgColor];
