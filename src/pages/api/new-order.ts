import prisma from "../../utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
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
  } = JSON.parse(req.body);

  const items = req.body.items;

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

    res.status(200).end();
  } catch (e) {
    res.status(500).end();
  }
}
