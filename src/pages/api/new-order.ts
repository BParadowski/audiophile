import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/backend/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, email, phoneNumber, address, zipCode, city, country, paymentMethod, cardNumber, cardPin, items } =
    JSON.parse(req.body);

  try {
    if (paymentMethod === "cash") {
      await prisma.order.create({
        data: {
          id,
          name,
          email,
          phoneNumber,
          address,
          zipCode,
          city,
          country,
          paymentMethod,
          items,
        },
      });
    } else {
      await prisma.order.create({
        data: {
          id,
          name,
          email,
          phoneNumber,
          address,
          zipCode,
          city,
          country,
          paymentMethod,
          cardNumber,
          cardPin,
          items,
        },
      });
    }

    res.status(200).json({ message: "order succesfuly placed", success: true });
  } catch (e) {
    res.status(500).json({ message: "order placing unsuccefull", success: false });
  }
}
