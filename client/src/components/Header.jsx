import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Header.module.css";
function Header() {
  return (
    <>
      <div className={styles.header}>
        <img src="https://placehold.co/250x100" alt="delish-monde-logo" />

        <div>
          <h1>Delish Monde</h1>
          <div id={styles.loginSignup}>
            <a href="login">Login </a>|<a href="signup"> Sign Up</a>
          </div>

          <nav>
            <ul className={styles.navbar}>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="about">About Us</a>
              </li>
              <li>
                <a href="menu">Menu</a>
              </li>
              <li>
                <a href="gallery">Gallery</a>
              </li>
              <li>
                <a href="contact">Contact</a>
              </li>
              <li>
                <a href="checkout">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className={styles.cartIcon}
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
