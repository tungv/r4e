import { readFile } from "fs/promises";
import { resolve } from "path";

export default async function loadSourceCode(
  filePath: string,
): Promise<string> {
  const sourceCode = await readFile(
    resolve(process.cwd(), "src", filePath),
    "utf8",
  );
  return sourceCode;
}
