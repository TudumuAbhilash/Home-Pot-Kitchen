import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/strapi";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (
      !customerName ||
      !phone ||
      !address
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customerName,
        phone,
        address,
        totalAmount: total,
        orderStatus: "Pending",
        items: JSON.stringify(cart),
      };

      const response =
        await createOrder(orderData);

      const orderId =
        response.data.documentId;

      clearCart();

      navigate(
        `/order-success?orderId=${orderId}`
      );
    } catch (error) {
      console.log(error);

      alert(
        "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border:
                  "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h3>{item.name}</h3>

              <p>
                ₹{item.price}
              </p>

              <p>
                Qty: {item.quantity}
              </p>

              <button
                onClick={() =>
                  decreaseQty(item.id)
                }
              >
                -
              </button>

              <button
                onClick={() =>
                  increaseQty(item.id)
                }
              >
                +
              </button>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <hr />

          <h2>
            Total: ₹{total}
          </h2>

          <h3>
            Customer Details
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            style={{
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              width: "300px",
            }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            style={{
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              width: "300px",
            }}
          />

          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            style={{
              display: "block",
              marginBottom: "20px",
              padding: "10px",
              width: "300px",
              height: "100px",
            }}
          />

          <button
            onClick={clearCart}
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              border: "none",
              marginRight: "10px",
            }}
          >
            Clear Cart
          </button>

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              background: "#ff6b35",
              color: "white",
              padding: "10px",
              border: "none",
            }}
          >
            {loading
              ? "Placing Order..."
              : "Checkout"}
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;