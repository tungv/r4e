import got from "got";
import { NextApiRequest, NextApiResponse } from "next";

export default async function SourceCodeAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const filePath = req.query.filePath as string[];
    const githubPath = `https://raw.githubusercontent.com/tungv/r4e/main/src/${filePath.join(
      "/",
    )}`;
    const response = await got(githubPath, { throwHttpErrors: false });

    const raw = response.body;

    res.setHeader("Content-Type", "text/plain");
    res.status(response.statusCode).send(raw);

    return;
  }

  res.status(405).end();
}
