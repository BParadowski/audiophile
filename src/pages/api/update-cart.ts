import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/backend/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cartId, productId, newQuantity } = req.body;

  const updateOptions = {
    where: {
      productId_cartId: {
        productId: productId,
        cartId: cartId,
      },
    },
    data: {
      quantity: newQuantity,
    },
  } satisfies Prisma.CartItemUpdateArgs;

  if (newQuantity > 0) {
    await prisma.cartItem.update(updateOptions);
  } else {
    await prisma.cartItem.delete({
      where: {
        productId_cartId: {
          productId: productId,
          cartId: cartId,
        },
      },
    });
  }
  res.status(200).end();
}
