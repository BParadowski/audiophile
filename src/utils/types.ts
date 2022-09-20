export interface ProductCardData {
  name: string;
  slug: string;
  description: string;
  isNew: boolean;
  category: string;
  preview: Urls;
}

export interface Urls {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductDataMinimal {
  slug: string;
  name: string;
  image: Urls;
}

export interface ProductData {
  id: number;
  slug: string;
  name: string;
  image: Urls;
  category: string;
  categoryImage: Urls;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  gallery: { first: Urls; second: Urls; third: Urls };
  others: ProductDataMinimal[];
}
