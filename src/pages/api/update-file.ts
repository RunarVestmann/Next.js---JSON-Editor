// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isRunningLocally } from "@/constants";
import { writeFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isRunningLocally) {
    return res
      .status(401)
      .json({ message: "Can not update file when not running locally" });
  }

  const filename = req.body.filename;
  writeFileSync(filename, JSON.stringify(req.body.data, null, "\t"));
  res.json({ message: "Saved successfully" });
}
