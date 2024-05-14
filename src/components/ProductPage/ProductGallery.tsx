import styles from "./ProductGallery.module.scss";

import Picture from "@/components/Shared/Picture";

interface ProductGalleryProps {
  slug: string;
}

const ProductGallery = ({ slug }: ProductGalleryProps) => {
  return (
    <section aria-label="Product gallery">
      <div className={styles.grid}>
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
  );
};

export default ProductGallery;
