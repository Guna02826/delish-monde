import styles from "../../styles/Menu.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [categorizedFoods, setCategorizedFoods] = useState({});

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/product/");
        const foodsData = response.data;
        setFoods(foodsData);
        setCategorizedFoods(categorizeFoods(foodsData));
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoods();
  }, []);

  const categorizeFoods = (foods) => {
    const categories = {};
    const bestSellers = [];

    foods.forEach((food) => {
      if (Array.isArray(food.category)) {
        if (food.category.includes("Best Sellers")) {
          bestSellers.push(food);
        }
        food.category.forEach((cat) => {
          if (cat !== "Best Sellers") {
            if (!categories[cat]) {
              categories[cat] = [];
            }
            categories[cat].push(food);
          }
        });
      }
    });

    return { "Best Sellers": bestSellers, ...categories };
  };

  return (
    <div className={styles.menuContainer}>
      {Object.keys(categorizedFoods).map((category) => (
        <div key={category} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.menu}>
            {categorizedFoods[category].map((food) => (
              <FoodItem key={food._id} food={food} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FoodItem({ food }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.food}>
      <h3>{food.name}</h3>
      <img src={food.image || "https://placehold.co/150"} alt={food.name} />
      <p className={styles.desc}>{food.description}</p>
      <b>₹{food.price}</b>
      <br />
      <button
        className={styles.addToCart}
        onClick={() => dispatch(addToCart(food))}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Menu;
