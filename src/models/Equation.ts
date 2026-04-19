export interface Equation {
type: "equation";
annotations: {
  bold: boolean;
  strikethrough: boolean;
  underline: boolean;
  italic: boolean;
  code: boolean;
  color: string;
};
equation: {
  expression: string;
};
plain_text: string;
href: null;
};
