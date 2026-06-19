import { useEffect, useState, useRef } from "react";
import { getOrders, updateOrderStatus } from "../../api/strapi";
import "../styles/Kitchen.css";

import alertSound from "../../assets/order-alert.mp3";
import { useSocketOrders } from "../../hooks/useSocketOrders";
function Kitchen() {
  const [orders, setOrders] = useState([]);
   const socketEvent = useSocketOrders();
  // Track previously seen order IDs
  const previousOrderIds = useRef(new Set());

  // Prevent repeated sound spam
  const lastSoundTime = useRef(0);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      const all = res?.data || [];

      // Filter only active kitchen orders
      const active = all.filter((o) => {
        const data = o.attributes || o;
        return (
          data.orderStatus === "Pending" ||
          data.orderStatus === "Preparing"
        );
      });

      // ---------------- SMART NEW ORDER DETECTION ----------------
      const currentIds = new Set(active.map((o) => o.id));

      let hasNewOrder = false;

      for (let id of currentIds) {
        if (!previousOrderIds.current.has(id)) {
          hasNewOrder = true;
          break;
        }
      }

      // ---------------- ALERT SYSTEM ----------------
      const now = Date.now();

      if (hasNewOrder && now - lastSoundTime.current > 3000) {
        try {
          new Audio(alertSound).play();
        } catch (err) {
          console.log("Audio blocked:", err);
        }

        lastSoundTime.current = now;
      }

      // Update tracked IDs
      previousOrderIds.current = currentIds;

      // Update UI
      setOrders(active);
    } catch (err) {
      console.log("Kitchen fetch error:", err);
    }
  };
  
  useEffect(() => {
  if (socketEvent) {
    new Audio(alertSound).play();
    fetchOrders(); // refresh instantly
  }
}, [socketEvent]);

  useEffect(() => {
  fetchOrders();
}, []);

  const updateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      // refresh immediately after status change
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const newOrder = useSocketOrders();

useEffect(() => {
  if (newOrder) {
    new Audio(alertSound).play();
    fetchOrders(); // refresh UI
  }
}, [newOrder]);

  return (
    <div className="kitchen-page">
      <h1>🔥 Kitchen Display System</h1>

      <div className="kitchen-grid">
        {orders.map((order) => {
          const data = order.attributes || order;

          return (
            <div key={order.id} className="kitchen-card">

              <h2>Order #{order.id}</h2>

              <p>
                <b>Customer:</b> {data.customerName}
              </p>

              <p>
                <b>Phone:</b> {data.phone || "-"}
              </p>

              <p className={`status ${data.orderStatus?.toLowerCase()}`}>
                {data.orderStatus}
              </p>

              <div className="items">
                {data.items?.map((item, i) => (
                  <div key={i} className="item">
                    🍽 {item.name} × {item.qty || item.quantity}
                  </div>
                ))}
              </div>

              <div className="actions">
                {data.orderStatus === "Pending" && (
                  <button
                    onClick={() => updateStatus(order.id, "Preparing")}
                  >
                    Start Cooking
                  </button>
                )}

                {data.orderStatus === "Preparing" && (
                  <button
                    onClick={() => updateStatus(order.id, "Ready")}
                  >
                    Mark Ready
                  </button>
                )}

                {data.orderStatus === "Ready" && (
                <button onClick={() => updateStatus(order.id, "Out for Delivery")}>
                Send for Delivery
                </button>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Kitchen;