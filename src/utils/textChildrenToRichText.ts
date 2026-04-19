import type { RichText } from "@/models/RichText";
import type {Equation} from "@/models/Equation";

export const textChildrenToRichText = (children: any[]):
  Array<RichText | Equation> => {
  return children.map((c) => {
    switch (c.type) {
      case "link": {
        const url: string = c.url || "";
        const title: string =
          c.title ||
          (Array.isArray(c.children)
            ? c.children
                .map((child: any) => child.value ?? "")
                .join("")
            : "");
        const content = title.trim();
        if (content.length === 0) {
          return(
            {
              type: "text",
              annotations: {
                bold: false,
                strikethrough: false,
                underline: false,
                italic: false,
                code: false,
                color: "default",
              },
              text: { content: url, link: { url } },
            })
        }
        return (
          {
            type: "text",
            annotations: {
              bold: false,
              strikethrough: false,
              underline: false,
              italic: false,
              code: false,
              color: "default",
            },
            text: { content, link: { url } },
          }
        )
      }
      case "strong":
        return {
          type: "text",
          annotations: {
            bold: true,
            strikethrough: false,
            underline: false,
            italic: false,
            code: false,
            color: "default",
          },
          text: { content: c.children[0].value || "" },
        };
      case "emphasis":
        return {
          type: "text",
          annotations: {
            bold: false,
            strikethrough: false,
            underline: false,
            italic: true,
            code: false,
            color: "default",
          },
          text: { content: c.children[0].value || "" },
        };
      case "delete":
        return {
          type: "text",
          annotations: {
            bold: false,
            strikethrough: true,
            underline: false,
            italic: false,
            code: false,
            color: "default",
          },
          text: { content: c.children[0].value || "" },
        };
      case "inlineCode":
        return {
          type: "text",
          annotations: {
            bold: false,
            strikethrough: false,
            underline: false,
            italic: false,
            code: true,
            color: "default",
          },
          text: { content: c.value || "" },
        };
      case "inlineMath":
        return {
          type: "equation",
          equation: {
            expression: c.value,
          },
          annotations: {
            bold: false,
            strikethrough: false,
            underline: false,
            italic: false,
            code: false,
            color: "default",
          },
          plain_text: c.value || "",
          href: null,
        };
      default:
        return {
          type: "text",
          annotations: {
            bold: false,
            strikethrough: false,
            underline: false,
            italic: false,
            code: false,
            color: "default",
          },
          text: { content: c.value || "" },
        };
    }
  });
};
