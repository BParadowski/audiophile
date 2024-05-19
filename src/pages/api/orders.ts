import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/backend/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, phoneNumber, address, zipCode, city, country, paymentMethod, cardNumber, cardPin, items } =
      req.body;

    const orderData = {
      name,
      email,
      phoneNumber,
      address,
      zipCode,
      city,
      country,
      paymentMethod,
      items,
    } satisfies Prisma.OrderCreateArgs["data"];

    console.log(orderData);

    try {
      if (paymentMethod === "cash") {
        await prisma.order.create({
          data: orderData,
        });
      } else {
        await prisma.order.create({
          data: { ...orderData, cardNumber, cardPin } satisfies Prisma.OrderCreateArgs["data"],
        });
      }

      res.status(201).json({ message: "Order succesfully placed", success: true });
    } catch (e) {
      res.status(400).json({ message: "Order placing unsuccefull", success: false });
    }
  }
}
