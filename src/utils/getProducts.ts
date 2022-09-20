import data from "./data.json";
import { ProductCardData } from "./types";

const getProducts = (category: string) => {
  const products: ProductCardData[] = [];
  const fullData = data;
  fullData.forEach((product) => {
    if (product.category === category) {
      const productData: ProductCardData = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        isNew: product.new,
        category: product.category,
        preview: product.categoryImage,
      };
      products.push(productData);
    }
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

export default getProducts;
