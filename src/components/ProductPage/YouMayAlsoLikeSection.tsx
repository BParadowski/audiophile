import Button from "../Shared/Button";
import styles from "./YouMayAlsoLikeSection.module.scss";

import { ProductNameSlugAndCategoryName } from "src/pages/[category]/[productSlug]";

import Picture from "@/components/Shared/Picture";

interface YouMayAlsoLikeSectionProps {
  relatedProducts: ProductNameSlugAndCategoryName[];
}

const YouMayAlsoLikeSection = ({ relatedProducts }: YouMayAlsoLikeSectionProps) => {
  return (
    <section aria-labelledby="also-like">
      <h2 id="also-like" className={styles.heading}>
        you may also like
      </h2>
      <div className={styles.grid}>
        {relatedProducts.map((item) => (
          <div key={item.slug} className={styles.itemCard}>
            <Picture
              desktopUrl={`/assets/shared/desktop/image-${item.slug}.jpg`}
              tabletUrl={`/assets/shared/tablet/image-${item.slug}.jpg`}
              mobileUrl={`/assets/shared/mobile/image-${item.slug}.jpg`}
              alt="Picture of the product"
            />
            {/* Replace shortens the name of some items for design purposes */}
            <h2>{item.name.replace(/headphones/i, "")}</h2>
            <Button as="Link" href={`/${item.categoryName}/${item.slug}`} theme="accent">
              see product
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YouMayAlsoLikeSection;
