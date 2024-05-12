import styles from "@/styles/pages/Category.module.scss";

import { Product } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";

import ProductCard from "@/components/Category/ProductCard";
import Manifesto from "@/components/Shared/Manifesto";
import ProductCategories from "@/components/Shared/ProductCategories";

import { getCategories, getProductsByCategory } from "@/utils/dbQueries";

const Category = ({
  products,
}: {
  products: Pick<Product, "name" | "slug" | "categoryName" | "description" | "isNew">[];
}) => {
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

export async function getStaticProps({ params }: { params: { category: string } }) {
  const products = await getProductsByCategory(params.category);

  return {
    props: { products },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map((category) => {
    return {
      params: {
        category: category.name,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
