import styles from "../../styles/About.module.css";

function About() {
  return (
    <>
      <div className={styles.aboutUs}>
        <h1 className={styles.aboutUsTitle}>About Us</h1>
        <p className={styles.aboutUsParagraph}>
          Delish Monde is a family-owned business that has been serving the
          Anytown area for over 20 years. We specialize in creating delicious,
          handcrafted pastries and desserts that are perfect for any occasion.
          Whether you're looking for a sweet treat to enjoy with your morning
          coffee or a show-stopping cake for a special celebration, we have you
          covered. Our team of talented bakers and pastry chefs are dedicated to
          creating high-quality, beautiful desserts that taste as good as they
          look. Stop by our bakery today to see what we have to offer!
        </p>
        <img src="https://placehold.co/400" alt="" />
        <p className={styles.aboutUsParagraph}>
          Our journey began with a simple dream: to share our love for baking
          with the world. Over the years, we've grown from a small home kitchen
          to a bustling bakery, thanks to the support of our wonderful
          community. We believe in using only the finest ingredients and
          traditional techniques to create our pastries, ensuring that every
          bite is a taste of perfection. Thank you for being a part of our
          story.
        </p>
      </div>
    </>
  );
}

export default About;
