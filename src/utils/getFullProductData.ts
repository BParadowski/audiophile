import data from "./data.json";

const getFullProductData = (slug: string) => {
  return data.find((product) => product.slug === slug);
};

export default getFullProductData;
