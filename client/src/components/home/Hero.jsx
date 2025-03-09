import styles from "../../styles/Hero.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [bestSellers, setBestSellers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/")
      .then((response) => {
        const bestSellerItems = response.data.filter((item) =>
          item.category.includes("Best Sellers")
        );
        setBestSellers(bestSellerItems);
      })
      .catch((error) => {
        console.error("Error fetching Best Sellers:", error);
      });
  }, []);

  return (
    <div className={styles.hero}>
      <img
        className={styles.heroImg}
        src="src/assets/images/Bakery-background.jpg"
        alt="Bakery"
      />

      <h1 className={styles.heroTitle}>
        Freshly Baked, From Our Oven to Your Table
      </h1>

      <p className={styles.heroDescription}>
        Our menu is made with the freshest ingredients, locally sourced and
        organic whenever possible. We offer a variety of options for every
        dietary need, including vegetarian, vegan, and gluten-free. Our menu
        changes seasonally, so check back often for new items!
      </p>

      <button className={styles.heroButton} onClick={() => navigate("/menu")}>
        Order Now
      </button>

      {/* Best Sellers Section */}
      <h2 className={styles.bestSellerTitle}>Best Sellers</h2>
      <div className={styles.bestSellerGrid}>
        {bestSellers.map((food) => (
          <FoodItem key={food._id} food={food} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

// FoodItem Component
function FoodItem({ food, dispatch }) {
  return (
    <div className={styles.foodItem}>
      <h3>{food.name}</h3>
      <img src={food.image || "https://placehold.co/150"} alt={food.name} />
      <p className={styles.desc}>{food.description}</p>
      <b>₹{food.price}</b>
      <br />
      <button onClick={() => dispatch(addToCart(food))}>Add to Cart</button>
    </div>
  );
}

export default Hero;
