import prisma from "./prisma";

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const getProductsByCategory = async (categoryName: string) => {
  const products = await prisma.product.findMany({
    where: {
      categoryName: categoryName,
    },
    select: {
      name: true,
      slug: true,
      isNew: true,
      description: true,
      categoryName: true,
    },
  });

  /* sort new products first*/

  products.sort((a, b) => {
    if (a.isNew && b.isNew === false) {
      return -1;
    }
    if (b.isNew && a.isNew === false) {
      return 1;
    } else return 0;
  });

  return products;
};

export const getProductPaths = async () => {
  const paths = await prisma.product.findMany({
    where: {},
    select: {
      slug: true,
      categoryName: true,
    },
  });

  return paths;
};

export const getProductData = async (productSlug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },
    include: {
      relatedProducts: {
        select: { name: true, slug: true, categoryName: true },
      },
    },
  });

  return product;
};
