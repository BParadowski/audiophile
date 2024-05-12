import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId, cartId, quantity } = JSON.parse(req.body);

  try {
    await prisma.cartItem.upsert({
      where: {
        productId_cartId: {
          productId: productId,
          cartId: cartId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        quantity: quantity,
        product: {
          connect: {
            id: productId,
          },
        },
        cart: {
          connect: {
            id: cartId,
          },
        },
      },
    });

    res.status(200).end();

    await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        modifiedAt: new Date(),
      },
    });
  } catch (e) {
    res.status(500).end();
  }
}
