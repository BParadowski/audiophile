import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/backend/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const newCart = await prisma.cart.create({
    data: {},
    select: {
      id: true,
    },
  });

  res.status(200).json(newCart.id);
}
