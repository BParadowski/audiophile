import prisma from "../../utils/backend/prisma";

import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export type CartsApiRes = {
  message: string;
  success: boolean;
};

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
  const cartId = req.query.id;

  if (req.method === "GET") {
    if (typeof cartId !== "string") {
      return res.status(400).json({ message: "Incorrect query params.", success: false });
    }

    let cartItems;
    try {
      cartItems = await prisma.cart.findUnique({
        where: {
          id: cartId,
        },
        select: itemsSelect,
      });

      if (cartItems) {
        res.status(200).json(cartItems.items);
      } else {
        res.status(404).json({ message: "Cart not found", success: false });
      }
    } catch {
      res.status(500).json({ message: "Error reading from the database", success: false });
    }
  } else if (req.method === "POST") {
    try {
      const newCart = await prisma.cart.create({
        data: {},
        select: {
          id: true,
        },
      } satisfies Prisma.CartCreateArgs);

      res.status(200).json(newCart.id);
    } catch (err) {
      res.status(500).json({ message: "Error creating cart in the database", success: false });
    }
  } else if (req.method === "PUT") {
  }
}
