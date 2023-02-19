// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filename = req.query.filename as string;
  res.json({ data: JSON.parse(readFileSync(filename, "utf8")) });
}
