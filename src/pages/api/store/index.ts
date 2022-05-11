import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  return res.status(404).json({ error: "Route not implemented" });
};

export default handler;
