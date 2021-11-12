import { readFileSync } from "node:fs";
import path from "node:path";
import { serialize } from "next-mdx-remote/serialize";
import imageSize from "rehype-img-size";

export default async function loadMdx(lesson: string, filePath: string) {
  const source = String(
    readFileSync(path.join(process.cwd(), `src/lessons/${lesson}/${filePath}`)),
  );
  const mdxSource = await serialize(source, {
    mdxOptions: {
      // use the image size plugin, you can also specify which folder to load images from
      // in my case images are in /public/images/, so I just prepend 'public'
      rehypePlugins: [[imageSize, { dir: "public" }]],
    },
  });
  return mdxSource;
}
