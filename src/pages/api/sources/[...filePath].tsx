import { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";
import { join } from "path";

export default async function SourceCodeAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const filePath = req.query.filePath as string[];

    const absolutePath = join(process.cwd(), "src", filePath.join("/"));

    try {
      const file = await readFile(absolutePath, "utf8");

      res.setHeader("Content-Type", "text/plain");
      res.status(200).send(file);
    } catch {
      res.status(404).end();
    }

    return;
  }

  res.status(405).end();
}
