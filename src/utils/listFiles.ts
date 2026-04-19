import { glob } from "glob";

/**
 * Lists files in a directory matching a glob pattern.
 * @param pattern The glob pattern to match.
 * @returns A promise that resolves to an array of file paths.
 */
export const listFiles = async (pattern: string): Promise<string[]> => {
  try {
    const files = await glob(pattern, { nodir: true });
    return files;
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
};
