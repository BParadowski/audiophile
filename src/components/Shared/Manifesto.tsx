import Picture from "./Picture";
import styles from "./Manifesto.module.scss";

const Manifesto = () => {
  return (
    <section className={styles.manifesto}>
      <div className={styles.grid}>
        <Picture
          desktopUrl="/assets/shared/desktop/image-best-gear.jpg"
          tabletUrl="/assets/shared/tablet/image-best-gear.jpg"
          mobileUrl="/assets/shared/mobile/image-best-gear.jpg"
          alt="Man wearing headphones pensively looking to the left."
          className={styles.image}
        />
        <h2 className={styles.heading}>
          Bringing you the <span className={styles.colored}>best</span> audio
          gear
        </h2>
        <p className={styles.text}>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
