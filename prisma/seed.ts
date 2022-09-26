import products from "./data.json";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: products.map((product) => {
      return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        isNew: product.new,
        price: product.price,
        description: product.description,
        features: product.features,
        accessories: product.includes,
      };
    }),
  });

  for (let product of products) {
    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        relatedProducts: {
          connect: product.others.map((related) => ({ slug: related.slug })),
        },
        category: {
          connectOrCreate: {
            where: { name: product.category },
            create: {
              name: product.category,
            },
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
