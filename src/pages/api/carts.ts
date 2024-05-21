import prisma from "../../utils/backend/prisma";

import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

/* GET response payload type and prisma query*/

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

/* PATCH*/

const patchActionTypes = z.enum(["add", "update"]);

const patchSchema = z.object({
  productId: z.number(),
  quantity: z.number().int().nonnegative(),
  action: patchActionTypes,
});

export type CartsPatchRequestBody = z.infer<typeof patchSchema>;

/* Handler */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cartId = req.query.id;

  if (req.method === "GET") {
    if (typeof cartId !== "string") {
      return res.status(400).json({ message: "Incorrect query params.", success: false });
    }

    let cartItems;
    console.log(JSON.stringify(cartId));
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
        res.status(404).json({ message: `Cart with id: ${cartId}`, success: false });
      }
    } catch (err) {
      res.status(500).json({ message: "Error reading from the database", success: false, error: err });
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
      res.status(500).json({ message: "Error creating cart in the database", success: false, error: err });
    }
  } else if (req.method === "DELETE") {
    if (typeof cartId !== "string") {
      return res.status(400).json({ message: "Incorrect query params.", success: false });
    }

    try {
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cartId,
        },
      } satisfies Prisma.CartItemDeleteManyArgs);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ message: "Cart not found.", success: false });
    }
  } else if (req.method === "PATCH") {
    if (typeof cartId !== "string") {
      return res.status(400).json({ message: "Incorrect query params.", success: false });
    }

    let parsedBody;
    try {
      parsedBody = patchSchema.parse(req.body);
    } catch (err) {
      return res.status(400).json({ message: "Invalid request body.", success: false, error: err });
    }

    const { action, productId, quantity } = parsedBody;

    if (action === "add") {
      const upsertArgs = {
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
      } satisfies Prisma.CartItemUpsertArgs;

      try {
        await prisma.cartItem.upsert(upsertArgs);
        res.status(200).end();

        await prisma.cart.update({
          where: {
            id: cartId,
          },
          data: {
            modifiedAt: new Date(),
          },
        });
      } catch (err) {
        res.status(500).json({ message: "Error writing to the database", success: false, error: err });
      }
    } else if (action === "update") {
      const updateOptions = {
        where: {
          productId_cartId: {
            productId: productId,
            cartId: cartId,
          },
        },
        data: {
          quantity: quantity,
        },
      } satisfies Prisma.CartItemUpdateArgs;

      try {
        if (quantity > 0) {
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
      } catch (err) {
        res.status(500).json({ message: "Error writing to the database", success: false, error: err });
      }
    }
  }
}
