import styles from "../../styles/Gallery.module.css";

function Gallery() {
  return (
    <>
      <h1>Gallery</h1>
      <div className={styles.gallery}>
        <img className="galleryImg" src="https://placehold.co/200" alt="" />
        <img className="galleryImg" src="https://placehold.co/200" alt="" />
        <img className="galleryImg" src="https://placehold.co/200" alt="" />
        <img className="galleryImg" src="https://placehold.co/200" alt="" />
      </div>
    </>
  );
}
export default Gallery;
