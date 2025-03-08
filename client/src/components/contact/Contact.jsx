import styles from "../../styles/Contact.module.css"
function Contact() {
  return (
    <>
      <div className={styles.contact}>
        <h1>Contact Us</h1>
        <p>Send us a message!</p>
        <div className={styles.form}>
        <form className={styles.form}>
          <label htmlFor="Name">Name</label>
          <input type="text" placeholder="Name" />
          <label htmlFor="E-mail">E-mail</label>
          <input type="email" placeholder="Email" />
          <label htmlFor="Message">Message</label>
          <textarea placeholder="Message"></textarea>
          <button>Send</button>
        </form>
        </div>
        <h1>Our Location</h1>
        <img src="https://placehold.co/200" alt="map" />
        <address>
          <h1>Visit Us</h1>
          <p>123 Main St</p>
          <p>Anytown, USA 12345</p>
          <p>123-456-7890</p>
        </address>
      </div>
    </>
  );
}

export default Contact;
