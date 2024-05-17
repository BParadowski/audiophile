import styles from "@/styles/pages/Product.module.scss";

import { Product } from "@prisma/client";
import Head from "next/head";

import AddToCart from "@/components/ProductPage/AddToCart";
import ProductDetails from "@/components/ProductPage/ProductDetails";
import ProductGallery from "@/components/ProductPage/ProductGallery";
import YouMayAlsoLikeSection from "@/components/ProductPage/YouMayAlsoLikeSection";
import GoBackButton from "@/components/Shared/GoBackButton";
import Manifesto from "@/components/Shared/Manifesto";
import Picture from "@/components/Shared/Picture";
import ProductCategories from "@/components/Shared/ProductCategories";

import { getProductData, getProductPaths } from "@/utils/backend/dbQueries";

// Type returned by getStaticProps used in "you may also like" section
export type ProductNameSlugAndCategoryName = Pick<Product, "name" | "slug" | "categoryName">;
// Shape of JSON in accessories prop
export type Accessory = {
  item: string;
  quantity: number;
};

interface ProductPageProps {
  productData: Product & {
    relatedProducts: ProductNameSlugAndCategoryName[];
  };
}

const ProductPage = ({ productData }: ProductPageProps) => {
  const { id, name, slug, isNew, price, description, features, relatedProducts } = productData;
  const accessories = productData.accessories as Accessory[];

  return (
    <main>
      <Head>
        <title>{`audiophile: ${name}`}</title>
        <meta name="description" content={`${name} product page`} />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>
      <div className="container">
        <GoBackButton />
        <div className={styles.grid}>
          <Picture
            desktopUrl={`/assets/product-${slug}/desktop/image-product.jpg`}
            tabletUrl={`/assets/product-${slug}/tablet/image-product.jpg`}
            mobileUrl={`/assets/product-${slug}/mobile/image-product.jpg`}
            className={styles.productImage}
          />
          <div className={styles.descriptionWrapper}>
            {isNew && <p className={styles.new}>new product</p>}
            <h1 className={styles.heading}>{name}</h1>
            <p className={styles.description}>{description}</p>
            <p aria-label="Price" className={styles.price}>{`$ ${price}`}</p>
            <AddToCart productId={id} />
          </div>
        </div>

        <ProductDetails features={features} accessories={accessories} />

        <ProductGallery slug={slug} />

        <YouMayAlsoLikeSection relatedProducts={relatedProducts} />

        <div className={styles["categories-wrapper"]}>
          <ProductCategories />
        </div>

        <div className={styles["manifesto-wrapper"]}>
          <Manifesto />
        </div>
      </div>
    </main>
  );
};

export default ProductPage;

export async function getStaticProps({ params }: { params: { category: string; productSlug: string } }) {
  const productData = await getProductData(params.productSlug);

  if (!productData) {
    throw new Error(`Product with slug: [ ${params.productSlug} ] does not exist in the database.`);
  }
  return {
    props: { productData },
  };
}

export async function getStaticPaths() {
  const slugsAndCategories = await getProductPaths();
  const paths = slugsAndCategories.map((data) => {
    return {
      params: {
        productSlug: data.slug,
        category: data.categoryName,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}
