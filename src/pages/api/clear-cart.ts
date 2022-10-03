import prisma from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartId } = JSON.parse(req.body);
  await prisma.cartItem.deleteMany({
    where: {
      cartId: cartId,
    },
  });
  res.status(200).end();
}
