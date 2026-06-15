import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p>Qty: {item.quantity}</p>

              <button onClick={() => decreaseQty(item.id)}>
                -
              </button>
              <button onClick={() => increaseQty(item.id)}>
                +
              </button>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total}</h2>

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
            style={{
              background: "#ff6b35",
              color: "white",
              padding: "10px",
              border: "none",
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;