import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { formSchema as orderFormSchema } from "@/components/CheckoutPage/CheckoutForm/formSchema";

import prisma from "@/utils/backend/prisma";

const orderItemsSchema = z.array(
  z
    .object({
      quantity: z.number(),
      product: z
        .object({
          name: z.string(),
          id: z.number(),
          slug: z.string(),
          price: z.number(),
        })
        .required(),
    })
    .required(),
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    let parsedFormData;
    let parsedItems;

    try {
      parsedFormData = orderFormSchema.parse(req.body.formData);
      parsedItems = orderItemsSchema.parse(req.body.items);
    } catch (err) {
      res.status(400).json({ message: "Malformed request", success: false });
      return;
    }

    const orderData = {
      ...parsedFormData,
      items: parsedItems,
    } satisfies Prisma.OrderCreateArgs["data"];

    try {
      await prisma.order.create({
        data: orderData,
      });

      res.status(201).json({ message: "Order succesfully placed", success: true });
    } catch (err) {
      res.status(500).json({ message: "Error writing to the database", success: false });
    }
  }
}
