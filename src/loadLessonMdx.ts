import { readFileSync } from "node:fs";
import path from "node:path";
import { serialize } from "next-mdx-remote/serialize";

export default async function loadMdx(lesson: string, filePath: string) {
  const source = String(
    readFileSync(path.join(process.cwd(), `src/lessons/${lesson}/${filePath}`)),
  );
  const mdxSource = await serialize(source);
  return mdxSource;
}
