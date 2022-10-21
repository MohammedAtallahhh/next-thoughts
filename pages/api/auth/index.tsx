import { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = await req.body;

    client
      .createIfNotExists(data)
      .then(() => res.status(200).json("Login success"));
  }
}
