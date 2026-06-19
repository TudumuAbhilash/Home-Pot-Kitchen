import { useState } from "react";
import axios from "axios";
import "../styles/TrackOrder.css";
import { useSocketOrders } from "../hooks/useSocketOrders";

const API = "http://localhost:1337/api";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const socketEvent = useSocketOrders();
  useEffect(() => {
  if (socketEvent) {
    fetchOrder(); // auto update tracking page
  }
}, [socketEvent]);
  const fetchOrder = async () => {
    if (!orderId) return;

    try {
      setLoading(true);

const res = await axios.get(
  `${API}/orders?filters[id][$eq]=${orderId}&populate=*`
);


      const data = res?.data?.data;

      if (!data) {
        alert("Order not found");
        return;
      }

      setOrder(data);
    } catch (err) {
      console.log("Fetch order error:", err);
      alert("Error fetching order");
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    "Pending",
    "Preparing",
    "Ready",
    "Out for Delivery",
    "Delivered",
  ];

  const getStepIndex = (status) => statusSteps.indexOf(status);
useEffect(() => {
  if (!orderId) return;

  const interval = setInterval(() => {
    fetchOrder();
  }, 4000); // refresh every 4 seconds

  return () => clearInterval(interval);
}, [orderId]);
  return (
    <div className="track-page">
      <h1>📦 Track Your Order</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={fetchOrder}>
          {loading ? "Loading..." : "Track"}
        </button>
        {loading && <p>🔄 Fetching latest status...</p>}
      </div>

      {order && (
        <div className="track-card">

          <h2>Order #{order.id}</h2>

          <p><b>Customer:</b> {order.attributes.customerName}</p>

          <p className="status">
            Current Status: {order.attributes.orderStatus}
          </p>

          {/* PROGRESS TRACKER */}
          <div className="tracker">
            {statusSteps.map((step, index) => {
              const currentIndex = getStepIndex(order.attributes.orderStatus);

              return (
                <div
                  key={step}
                  className={`step ${
                    index <= currentIndex ? "active" : ""
                  }`}
                >
                  <div className="circle">{index + 1}</div>
                  <span>{step}</span>
                </div>
              );
            })}
          </div>

          {/* ITEMS */}
          <div className="items">
            {order.attributes.items?.map((item, i) => (
              <div key={i}>
                🍽 {item.name} × {item.qty || item.quantity}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}

export default TrackOrder;