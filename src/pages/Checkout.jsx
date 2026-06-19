import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Checkout.css";

import { useCart } from "../context/CartContext";
import { createOrder } from "../api/strapi";

function Checkout() {
const navigate = useNavigate();

const { cartItems, clearCart } = useCart();

console.log("CHECKOUT CART:", cartItems);

const [customerName, setCustomerName] =
useState("");

const [phone, setPhone] =
useState("");

const [email, setEmail] =
useState("");

const [address, setAddress] =
useState("");

const [loading, setLoading] =
useState(false);

const subtotal = cartItems.reduce(
(total, item) =>
total +
Number(item.price) * item.quantity,
0
);

const deliveryFee =
cartItems.length > 0 ? 40 : 0;

const gst = Math.round(
subtotal * 0.05
);

const grandTotal =
subtotal +
deliveryFee +
gst;

const handleSubmit = async (e) => {
e.preventDefault();

try {
  setLoading(true);

  const response =
    await createOrder({
      customerName,
      phone,
      address,
      totalAmount: grandTotal,
      orderStatus: "Pending",
      items: JSON.stringify(cartItems),
    });

  const orderId =
    response.data.documentId;

  clearCart();

 navigate(`/order-success?orderId=${response.data.documentId || response.data.id}`);
} catch (error) {
  console.error(error);

  alert(
    "Failed to place order."
  );
} finally {
  setLoading(false);
}

};

return (
<>



  <section className="checkout-page">
    <div className="checkout-container">

      <div className="checkout-form">
        <h2>
          Delivery Information
        </h2>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <textarea
            rows="5"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
            disabled={
              loading ||
              cartItems.length === 0
            }
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </form>
      </div>

      <div className="order-summary">
        <h2>
          Order Summary
        </h2>

        {cartItems.length === 0 ? (
          <p>
            Your cart is empty.
          </p>
        ) : (
          <>
            {cartItems.map(
              (item) => (
                <div
                  className="summary-item"
                  key={item.id}
                >
                  <span>
                    {item.name} ×{" "}
                    {item.quantity}
                  </span>

                  <span>
                    ₹
                    {Number(
                      item.price
                    ) *
                      item.quantity}
                  </span>
                </div>
              )
            )}

            <hr />

            <div className="summary-item">
              <span>
                Subtotal
              </span>
              <span>
                ₹{subtotal}
              </span>
            </div>

            <div className="summary-item">
              <span>
                Delivery Fee
              </span>
              <span>
                ₹{deliveryFee}
              </span>
            </div>

            <div className="summary-item">
              <span>GST</span>
              <span>
                ₹{gst}
              </span>
            </div>

            <div className="grand-total">
              <span>Total</span>
              <span>
                ₹{grandTotal}
              </span>
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