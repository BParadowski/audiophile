import getProductPaths from "../../../utils/getProductPaths";
import getFullProductData from "../../../utils/getFullProductData";
import Head from "next/head";
import styles from "../../../styles/pages/Product.module.scss";
import ProductCategories from "../../../components/Shared/ProductCategories";
import Manifesto from "../../../components/Shared/Manifesto";
import { ProductData } from "../../../utils/types";
import { useRouter } from "next/router";
import Picture from "../../../components/Shared/Picture";
import { useEffect, useState } from "react";
import Link from "next/link";

const Category = ({ product }: { product: ProductData }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  }, []);

  return (
    <main>
      <Head>
        <title>{`audiophile: ${product.name}`}</title>
        <meta
          name="description"
          content={`${router.query.name} product page`}
        />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>
      <div className="container">
        <button onClick={() => router.back()} className={styles.back}>
          Go Back
        </button>
        <div className={styles["grid-main"]}>
          <Picture
            desktopUrl={product.image.desktop}
            tabletUrl={product.image.tablet}
            mobileUrl={product.image.mobile}
            className={styles["main_image"]}
          />
          <div className={styles["main_description-wrapper"]}>
            {product.new && <p className={styles.new}>new product</p>}
            <h1 className={styles.heading}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>
            <p
              aria-label="Price"
              className={styles.price}
            >{`$ ${product.price}`}</p>
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
          <p className={styles["features_description"]}>{product.features}</p>
          <h2 className={styles["features_heading-box"]}>in the box</h2>
          <ul role="list" className={styles["features_item-list"]}>
            {product.includes.map((item) => (
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
              desktopUrl={product.gallery.first.desktop}
              tabletUrl={product.gallery.first.tablet}
              mobileUrl={product.gallery.first.mobile}
              alt=""
            />
            <Picture
              className={styles.second}
              desktopUrl={product.gallery.second.desktop}
              tabletUrl={product.gallery.second.tablet}
              mobileUrl={product.gallery.second.mobile}
              alt=""
            />
            <Picture
              className={styles.third}
              desktopUrl={product.gallery.third.desktop}
              tabletUrl={product.gallery.third.tablet}
              mobileUrl={product.gallery.third.mobile}
              alt=""
            />
          </div>
        </section>
        <section aria-labelledby="also-like">
          <h1 id="also-like" className={styles["also-like-heading"]}>
            you may also like
          </h1>
          {product.others.map((item) => (
            <div key={item.slug} className={styles["item-card"]}>
              <Picture
                desktopUrl={item.image.desktop}
                tabletUrl={item.image.tablet}
                mobileUrl={item.image.mobile}
                alt="Picture of the product"
              />
              <h2>{item.name}</h2>
              <Link href={`/${item.category}/${item.slug}`}>
                <a className="button-accent">see product</a>
              </Link>
            </div>
          ))}
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

export default Category;

export function getStaticProps({
  params,
}: {
  params: { category: string; product: string };
}) {
  const product = getFullProductData(params.product);

  return {
    props: { product },
  };
}

export function getStaticPaths() {
  const paths = getProductPaths();

  return {
    paths: paths,
    fallback: false,
  };
}
