import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { blockquoteToBlocks } from "@/plugins/blockquoteToBlocks";
import { codeToBlocks } from "@/plugins/codeToBlock";
import { headingToBlocks } from "@/plugins/headingToBlock";
import { listToBlocks } from "@/plugins/listToBlocks";
import { paragraphToBlocks } from "@/plugins/paragraphToBlocks";
import { removePosition } from "@/plugins/removePosition";
import { tableToBlocks } from "@/plugins/tableToBlock";
import { thematickBreakToBlock } from "@/plugins/thematickBreakToBlock";
import { writeFileSync } from "node:fs";

export const mdToBlocks = async (md: string, verbose: number=0) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkGfm)
    .use(headingToBlocks)
    .use(blockquoteToBlocks)
    .use(tableToBlocks)
    .use(thematickBreakToBlock)
    .use(codeToBlocks)
    .use(listToBlocks)
    .use(paragraphToBlocks)
    .use(removePosition);

  if (verbose >=1){
    const remarkProcessor = unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkGfm)

    const remarkTree = remarkProcessor.parse(md);
    const remarkTransformed = remarkProcessor.runSync(remarkTree);
    writeFileSync("./sandbox/remarkTree.json", JSON.stringify(remarkTransformed, null, 2));
  }

  const tree = processor.parse(md);
  const transformed = processor.runSync(tree);

  return (transformed as any).children;
};
