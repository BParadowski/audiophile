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
              name: true,
              price: true,
              slug: true,
              id: true,
            },
          },
        },
      },
    },
  });

  //   console.log(cart?.contents);
  res.status(200).json(cart?.contents);
}
