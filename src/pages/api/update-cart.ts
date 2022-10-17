import prisma from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartId, productId, newQuantity } = JSON.parse(req.body);
  if (newQuantity > 0) {
    await prisma.cartItem.update({
      where: {
        productId_cartId: {
          productId: productId,
          cartId: cartId,
        },
      },
      data: {
        quantity: newQuantity,
      },
    });
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
