export interface RichText {
  type: "text";
  annotations: {
    bold: boolean;
    strikethrough: boolean;
    underline: boolean;
    italic: boolean;
    code: boolean;
    color: string;
  };
  text: {
    content: string;
    link?: {
      url: string
    }
  };
  equation?: string
  href?: string
}
