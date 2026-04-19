/**
 * Create a Notion Table of Contents block
 * @returns A Notion Table of Contents block object
 */
export const createTocBlock = () => {
  const block = {
    object: "block",
    type: "table_of_contents",
    table_of_contents: {
      color: "default",
    },
  };
  return block;
};
