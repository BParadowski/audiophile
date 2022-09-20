import { useRouter } from "next/router";
import getCategories from "../../utils/getCategories";
import getProducts from "../../utils/getProducts";
import Head from "next/head";
import styles from "../../styles/pages/Category.module.scss";
import ProductCategories from "../../components/Shared/ProductCategories";
import Manifesto from "../../components/Shared/Manifesto";
import { ProductCardData } from "../../utils/types";
import ProductCard from "../../components/Category/ProductCard";

const Category = ({ products }: { products: ProductCardData[] }) => {
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>{`audiophile: ${router.query.category}`}</title>
        <meta name="description" content={`${router.query.category}`} />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>
      <div className={styles["title-wrapper"]}>
        <div className={`container ${styles.container}`}>
          <h1 className={styles.title}>{router.query.category}</h1>
        </div>
      </div>
      <div className="container">
        <div className={styles.layout}>
          {products.map((product) => (
            <ProductCard product={product} key={product.name} />
          ))}
          <ProductCategories />
          <Manifesto />
        </div>
      </div>
    </main>
  );
};

export default Category;

export function getStaticProps({ params }: { params: { category: string } }) {
  const products = getProducts(params.category);

  return {
    props: { products },
  };
}

export function getStaticPaths() {
  const paths = getCategories()?.map((category) => {
    return {
      params: {
        category: category,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
