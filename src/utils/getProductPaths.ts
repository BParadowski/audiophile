import data from "./data.json";

const getProductPaths = () => {
  return data.map((product) => {
    return {
      params: {
        category: product.category,
        product: product.slug,
      },
    };
  });
};

export default getProductPaths;
