import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Cart.module.css";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Simulate checkout process (clear cart and navigate to success page)
    dispatch(clearCart());
    navigate("/order-success");
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <img src={item.image || "https://placehold.co/100"} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price} x {item.quantity}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart(item._id))}>
                Remove
              </button>
            </div>
          ))}
          <button className={styles.clearCart} onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
