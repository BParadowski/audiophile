import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/backend/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* Nextjs automaticaly parses the request body based on headers*/
  const { cartId } = req.body;
  console.log(cartId);
}
