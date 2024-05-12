import prisma from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartId } = JSON.parse(req.body);
  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    select: {
      contents: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              slug: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json(cart?.contents);
}
