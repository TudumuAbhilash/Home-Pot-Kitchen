import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ManualOrder.css";

const API = "http://localhost:1337/api";

function ManualOrder() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // ---------------- FETCH MENU ----------------
  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API}/menu-items?populate=*`);
      setMenu(res.data.data || []);
    } catch (err) {
      console.error("Menu load error:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // ---------------- CART ACTIONS ----------------
  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);

    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.attributes.name,
          price: item.attributes.price,
          qty: 1,
        },
      ]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id);

    setCart(
      cart.map((c) =>
        c.id === id ? { ...c, qty } : c
      )
    );
  };

  // ---------------- CALCULATION ----------------
  const subtotal = () =>
    cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const gst = () => subtotal() * 0.05;

  const grandTotal = () => subtotal() + gst();

  // ---------------- BILL GENERATOR ----------------
  const printBill = (order) => {
    const win = window.open("", "_blank");

    const rows = order.items
      .map(
        (i) => `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>₹${i.price}</td>
        <td>₹${i.qty * i.price}</td>
      </tr>
    `
      )
      .join("");

    win.document.write(`
      <html>
      <head>
        <title>HomePot Bill</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          .summary { margin-top: 20px; text-align: right; }
        </style>
      </head>
      <body>
        <h2>🍲 HomePot Kitchen</h2>

        <p><b>Customer:</b> ${order.customerName}</p>
        <p><b>Phone:</b> ${order.phone || "-"}</p>
        <p><b>Order ID:</b> ${order.id}</p>

        <table>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          ${rows}
        </table>

        <div class="summary">
          <p>Subtotal: ₹${order.subtotal}</p>
          <p>GST (5%): ₹${order.gst.toFixed(2)}</p>
          <h3>Grand Total: ₹${order.total}</h3>
        </div>

        <script>window.print();</script>
      </body>
      </html>
    `);

    win.document.close();
  };

  // ---------------- CREATE ORDER ----------------
  const createOrder = async () => {
    if (!customerName || cart.length === 0) {
      alert("Enter customer name & add items");
      return;
    }

    const orderData = {
      data: {
        customerName,
        phone,
        items: cart,
        subtotal: subtotal(),
        gst: gst(),
        totalAmount: grandTotal(),
        status: "Pending",
        orderSource: "manual",
      },
    };

    try {
      setLoading(true);

      const res = await axios.post(`${API}/orders`, orderData);

      const createdOrder = {
        id: res.data.data.id,
        ...orderData.data,
      };

      setLastOrder(createdOrder);

      alert("Order Created Successfully!");

      printBill(createdOrder);

      setCart([]);
      setCustomerName("");
      setPhone("");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="manual-order">
      <h2>🧾 Manual Order System (Cloud Kitchen)</h2>

      {/* CUSTOMER */}
      <div className="customer-box">
        <input
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="layout">
        {/* MENU */}
        <div className="menu">
          <h3>Menu</h3>
          {menu.map((item) => (
            <div key={item.id} className="menu-item">
              <span>{item.attributes.name}</span>
              <b>₹{item.attributes.price}</b>
              <button onClick={() => addToCart(item)}>
                Add
              </button>
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="cart">
          <h3>Cart</h3>

          {cart.length === 0 ? (
            <p>No items</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>

                <div className="qty">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>
                    +
                  </button>
                </div>

                <span>₹{item.qty * item.price}</span>

                <button onClick={() => removeItem(item.id)}>❌</button>
              </div>
            ))
          )}

          <hr />

          <p>Subtotal: ₹{subtotal()}</p>
          <p>GST: ₹{gst().toFixed(2)}</p>
          <h3>Total: ₹{grandTotal()}</h3>

          <button
            className="create-btn"
            onClick={createOrder}
            disabled={loading}
          >
            {loading ? "Processing..." : "Create Order"}
          </button>

          {lastOrder && (
            <button
              className="print-btn"
              onClick={() => printBill(lastOrder)}
            >
              🧾 Reprint Last Bill
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManualOrder;