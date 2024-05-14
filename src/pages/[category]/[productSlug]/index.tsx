import styles from "@/styles/pages/Product.module.scss";

import { Product } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { cartContext } from "@/components/CartContextProvider";
import ProductGallery from "@/components/ProductPage/ProductGallery";
import YouMayAlsoLikeSection from "@/components/ProductPage/YouMayAlsoLikeSection";
import Counter from "@/components/Shared/Counter";
import GoBackButton from "@/components/Shared/GoBackButton";
import Manifesto from "@/components/Shared/Manifesto";
import Picture from "@/components/Shared/Picture";
import ProductCategories from "@/components/Shared/ProductCategories";

import { getProductData, getProductPaths } from "@/utils/backend/dbQueries";

// Type returned by getStaticProps used in "you may also like" section
export type ProductNameSlugAndCategoryName = Pick<Product, "name" | "slug" | "categoryName">;

interface ProductPageProps {
  productData: Product & {
    relatedProducts: ProductNameSlugAndCategoryName[];
  };
}

const ProductPage = ({ productData }: ProductPageProps) => {
  const { id, name, slug, isNew, price, description, features, relatedProducts } = productData;
  const accessories = productData.accessories as Array<{
    item: string;
    quantity: number;
  }>;

  const cart = useContext(cartContext);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  /* Brings product count back to one every time a user switches product pages */
  useEffect(() => {
    setQuantity(1);
  }, [router.query]);

  return (
    <main>
      <Head>
        <title>{`audiophile: ${name}`}</title>
        <meta name="description" content={`${name} product page`} />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>
      <div className="container">
        <GoBackButton />
        <div className={styles["grid-main"]}>
          <Picture
            desktopUrl={`/assets/product-${slug}/desktop/image-product.jpg`}
            tabletUrl={`/assets/product-${slug}/tablet/image-product.jpg`}
            mobileUrl={`/assets/product-${slug}/mobile/image-product.jpg`}
            className={styles["main_image"]}
          />
          <div className={styles["main_description-wrapper"]}>
            {isNew && <p className={styles.new}>new product</p>}
            <h1 className={styles.heading}>{name}</h1>
            <p className={styles.description}>{description}</p>
            <p aria-label="Price" className={styles.price}>{`$ ${price}`}</p>
            <div className={styles["buttons-wrapper"]}>
              <Counter
                number={quantity}
                onMinusClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                onPlusClick={() => setQuantity(quantity + 1)}
              />
              {cart?.addingProduct ? (
                <button className={`button-accent ${styles.add}`}>Adding...</button>
              ) : (
                <button
                  className={`button-accent ${styles.add}`}
                  onClick={() => {
                    cart?.addItem(id, quantity);
                    setQuantity(1);
                  }}
                >
                  add to cart
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles["grid-features"]}>
          <h2 className={styles["features_heading"]}>features</h2>
          <p className={styles["features_description"]}>{features}</p>
          <h2 className={styles["features_heading-box"]}>in the box</h2>
          <ul role="list" className={styles["features_item-list"]}>
            {accessories.map((item) => (
              <li key={item.item}>
                <span>{`${item.quantity}x`}</span>
                <p>{item.item}</p>
              </li>
            ))}
          </ul>
        </div>

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
