import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/backend/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cartId } = JSON.parse(req.body);
  await prisma.cartItem.deleteMany({
    where: {
      cartId: cartId,
    },
  });
  res.status(200).end();
}
