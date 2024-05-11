import Head from "next/head";
import styles from "../../../styles/pages/Product.module.scss";
import ProductCategories from "../../../components/Shared/ProductCategories";
import Manifesto from "../../../components/Shared/Manifesto";
import Picture from "../../../components/Shared/Picture";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import GoBackButton from "../../../components/Shared/GoBackButton";
import { getProductPaths, getProductData } from "../../../utils/dbQueries";
import { Product } from "@prisma/client";
import { cartContext } from "../../../components/CartContextProvider";
import Counter from "../../../components/Shared/Counter";
import { useRouter } from "next/router";

const ProductPage = ({
  productData,
}: {
  productData: Product & {
    relatedProducts: Pick<Product, "name" | "slug" | "categoryName">[];
  };
}) => {
  const {
    id,
    name,
    slug,
    isNew,
    price,
    description,
    features,
    relatedProducts,
  } = productData;
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
                <button className={`button-accent ${styles.add}`}>
                  Adding...
                </button>
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
                {/* Replace shortens the name of some items for design purposes */}
                <h2>{item.name.replace(/headphones/i, "")}</h2>
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
