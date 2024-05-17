import prisma from "../../utils/backend/prisma";

import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const itemsSelect = {
  items: {
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
    orderBy: { createdAt: "asc" },
  },
} satisfies Prisma.CartSelect;

export type ItemsWithProductDetails = Prisma.CartGetPayload<{ select: typeof itemsSelect }>["items"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cartId } = req.body;
  const cartItems = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    select: itemsSelect,
  });

  if (cartItems) {
    res.status(200).json(cartItems.items);
  } else {
    res.status(500).json({ success: false, message: "Cart not found" });
  }
}
