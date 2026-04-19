import { textChildrenToRichText } from "./textChildrenToRichText";

export const listItemChildrenToRichText = (
  children: any[],
  ordered: boolean,
): any[] => {
  return children.map((c) => {
    if (c.children.length === 0) {
      if (ordered === false) {
        return {
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: textChildrenToRichText(c.children[0].children || []),
          },
        };
      } else {
        return {
          type: "numbered_list_item",
          numbered_list_item: {
            rich_text: textChildrenToRichText(c.children[0].children || []),
          },
        };
      }
    } else {
      let items: any[] = [];
      c.children.slice(1).forEach((child: any) => {
        if (child.type === "list") {
          const subs = listItemChildrenToRichText(
            child.children,
            child.ordered,
          );
          items = [...items, ...subs];
          console.log(JSON.stringify(subs, null, 2));
          console.log(JSON.stringify(items, null, 2));
        } else {
          items.push({
            type: "paragraph",
            paragraph: {
              rich_text: textChildrenToRichText(child.children || []),
            },
          });
        }
      });
      if (items.length > 0) {
        if (ordered === false) {
          return {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: textChildrenToRichText(c.children[0].children || []),
              children: items,
            },
          };
        } else {
          return {
            type: "numbered_list_item",
            numbered_list_item: {
              rich_text: textChildrenToRichText(c.children[0].children || []),
              children: items,
            },
          };
        }
      } else {
        if (ordered === false) {
          return {
            object: "block",
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: textChildrenToRichText(c.children[0].children || []),
            },
          };
        } else {
          return {
            object: "block",
            type: "numbered_list_item",
            numbered_list_item: {
              rich_text: textChildrenToRichText(c.children[0].children || []),
            },
          };
        }
      }
    }
  });
};
