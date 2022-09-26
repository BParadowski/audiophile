import Head from "next/head";
import styles from "../../../styles/pages/Product.module.scss";
import ProductCategories from "../../../components/Shared/ProductCategories";
import Manifesto from "../../../components/Shared/Manifesto";
import { useRouter } from "next/router";
import Picture from "../../../components/Shared/Picture";
import { useEffect, useState } from "react";
import Link from "next/link";
import GoBackButton from "../../../components/Shared/GoBackButton";
import { getProductPaths, getProductData } from "../../../utils/dbQueries";
import { Product, Prisma } from "@prisma/client";

const ProductPage = ({
  productData,
}: {
  productData: Product & {
    relatedProducts: {
      name: string;
      slug: string;
      categoryName: string | null;
    }[];
  };
}) => {
  const { name, slug, isNew, price, description, features, relatedProducts } =
    productData;

  let accessories = productData.accessories as Prisma.JsonArray;

  const [quantity, setQuantity] = useState(1);

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
              <div className={styles.counter}>
                <button
                  aria-label="minus"
                  className={styles.minus}
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                <output className={styles.quantity}>{quantity}</output>
                <button
                  aria-label="plus"
                  onClick={() => {
                    if (quantity < 10) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  className={styles.plus}
                >
                  +
                </button>
              </div>
              <button className="button-accent">add to cart</button>
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
        <section aria-label="Product gallery">
          <div className={styles["grid-gallery"]}>
            <Picture
              className={styles.first}
              desktopUrl={`/assets/product-${slug}/desktop/image-gallery-1.jpg`}
              tabletUrl={`/assets/product-${slug}/tablet/image-gallery-1.jpg`}
              mobileUrl={`/assets/product-${slug}/mobile/image-gallery-1.jpg`}
              alt=""
            />
            <Picture
              className={styles.second}
              desktopUrl={`/assets/product-${slug}/desktop/image-gallery-2.jpg`}
              tabletUrl={`/assets/product-${slug}/tablet/image-gallery-2.jpg`}
              mobileUrl={`/assets/product-${slug}/mobile/image-gallery-2.jpg`}
              alt=""
            />
            <Picture
              className={styles.third}
              desktopUrl={`/assets/product-${slug}/desktop/image-gallery-3.jpg`}
              tabletUrl={`/assets/product-${slug}/tablet/image-gallery-3.jpg`}
              mobileUrl={`/assets/product-${slug}/mobile/image-gallery-3.jpg`}
              alt=""
            />
          </div>
        </section>
        <section aria-labelledby="also-like">
          <h1 id="also-like" className={styles["also-like-heading"]}>
            you may also like
          </h1>
          <div className={styles["grid-also-like"]}>
            {relatedProducts.map((item) => (
              <div key={item.slug} className={styles["item-card"]}>
                <Picture
                  desktopUrl={`/assets/shared/desktop/image-${item.slug}.jpg`}
                  tabletUrl={`/assets/shared/tablet/image-${item.slug}.jpg`}
                  mobileUrl={`/assets/shared/mobile/image-${item.slug}.jpg`}
                  alt="Picture of the product"
                />
                <h2>{item.name}</h2>
                <Link href={`/${item.categoryName}/${item.slug}`}>
                  <a className="button-accent">see product</a>
                </Link>
              </div>
            ))}
          </div>
        </section>
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

export async function getStaticProps({
  params,
}: {
  params: { category: string; productSlug: string };
}) {
  const productData = await getProductData(params.productSlug);

  if (!productData) {
    throw new Error(
      `Product with slug: [ ${params.productSlug} ] does not exist in the database.`
    );
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
