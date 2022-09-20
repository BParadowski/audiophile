import data from "./data.json";
import { ProductData } from "./types";

const getCategories = () => {
  const products: ProductData[] = data;

  const categories = products.reduce<string[] | undefined>((acc, current) => {
    if (!acc?.includes(current.category)) {
      return acc?.concat(current.category);
    } else return acc;
  }, []);
  return categories;
};

export default getCategories;
