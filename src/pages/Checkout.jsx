import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

const { cartItems } = useCart();

const subtotal = cartItems.reduce(
  (total, item) =>
    total +
    parseInt(item.price.replace("₹", "")) *
      item.quantity,
  0
);

const deliveryFee =
  cartItems.length > 0 ? 40 : 0;

const gst = Math.round(subtotal * 0.05);

const grandTotal =
  subtotal + deliveryFee + gst; 

const navigate = useNavigate();
const handleSubmit = (e) => {
  e.preventDefault();

  navigate("/order-success");
};
  
function Checkout() {
  return (
    <>
      <Navbar />

      <section className="checkout-page">

        <div className="checkout-container">

          {/* LEFT */}

          <div className="checkout-form">

            <h2>Delivery Information</h2>

            <form onSubmit={handleSubmit}>

              <input
            type="text"
            placeholder="Full Name"
            required
            />

            <input
              type="tel"
                placeholder="Phone Number"
              required
             />

            <input
            type="email"
              placeholder="Email Address"
             required
            />

            <input
             type="text"
             placeholder="Landmark"
            />

              <textarea
                rows="5"
                placeholder="Delivery Address"
              />

              <button
              type="submit"
              disabled={cartItems.length === 0}
              >
               Place Order
              </button>

            </form>

          </div>

          {/* RIGHT */}

          <div className="order-summary">

  <h2>Order Summary</h2>

  {cartItems.length === 0 ? (

    <p>Your cart is empty.</p>

  ) : (

    <>
      {cartItems.map((item) => (

        <div
          className="summary-item"
          key={item.id}
        >
          <span>
            {item.name} × {item.quantity}
          </span>

          <span>
            ₹{
              parseInt(
                item.price.replace("₹", "")
              ) * item.quantity
            }
          </span>
        </div>

      ))}

      <hr />

      <div className="summary-item">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="summary-item">
        <span>Delivery Fee</span>
        <span>₹{deliveryFee}</span>
      </div>

      <div className="summary-item">
        <span>GST</span>
        <span>₹{gst}</span>
      </div>

      <div className="grand-total">
        <span>Total</span>
        <span>₹{grandTotal}</span>
      </div>
    </>

  )}

</div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Checkout;