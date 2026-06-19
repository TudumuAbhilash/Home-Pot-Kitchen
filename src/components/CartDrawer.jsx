import "../styles/CartDrawer.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {
  const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
} = useCart();

  console.log("DRAWER CART:", cartItems);

  const totalPrice = cartItems.reduce(
  (total, item) => {
    const price =
      typeof item.price === "string"
        ? Number(item.price.replace("₹", ""))
        : Number(item.price);

    return total + price * item.quantity;
  },
  0
);

  const deliveryFee =
  cartItems.length > 0 ? 40 : 0;

  const gst = Math.round(
  totalPrice * 0.05
  );

  const grandTotal =
  totalPrice +
  deliveryFee +
  gst;

  return (
    <>
      <div
        className={`cart-overlay ${
          isOpen ? "show" : ""
        }`}
        onClick={onClose}
      />

      <div
        className={`cart-drawer ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="cart-header">

          <h2>Your Order</h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <div className="cart-body">

          {cartItems.length === 0 ? (
            <div className="empty-cart">

              <h3>🛒 Empty Cart</h3>

              <p>
                Add some delicious dishes.
              </p>

            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
              <div className="cart-item-left">

            <img
              src={item.image}
              alt={item.name}/>

              <div className="cart-item-info">

            <h4>{item.name}</h4>

            <p>₹{item.price}</p>

        </div>

        </div>

        <div className="quantity-controls">

        <button
          onClick={() =>
          decreaseQuantity(item.id)
        }
        >
      −
        </button>

        <span>{item.quantity}</span>

        <button
        onClick={() =>
        increaseQuantity(item.id)
        }
        >
      +
        </button>

        </div>
        </div>
            ))
          )}

        </div>

        <div className="cart-footer">

          <div className="bill-row">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
          </div>

          <div className="bill-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <div className="bill-row">
           <span>GST</span>
           <span>₹{gst}</span>
          </div>

          <div className="bill-total">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <Link to="/checkout" className="checkout-btn"> Proceed To Checkout</Link>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;