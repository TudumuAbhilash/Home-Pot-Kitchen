import { useState, useEffect, useMemo } from "react";
import "../styles/Orders.css";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../api/strapi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);

  // ---------------- FETCH ----------------
  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res?.data || []);
      setLoading(false);
    } catch (err) {
      console.log("Orders fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- ACTIONS ----------------
  const updateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // ---------------- SAFE FIELD HELPER ----------------
  const getField = (order, key) =>
    order?.attributes?.[key] ?? order?.[key];

  // ---------------- FILTER ----------------
  const filteredOrders = useMemo(() => {
    return (orders || []).filter((order) => {
      const name =
        getField(order, "customerName") || "";

      const status =
        getField(order, "orderStatus");

      const matchSearch = name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "All" ||
        status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // ---------------- SUMMARY ----------------
  const summary = useMemo(() => {
    const data = orders.map(
      (o) => o.attributes || o
    );

    return {
      total: data.length,
      pending: data.filter(
        (o) => o.orderStatus === "Pending"
      ).length,
      preparing: data.filter(
        (o) => o.orderStatus === "Preparing"
      ).length,
      delivered: data.filter(
        (o) => o.orderStatus === "Delivered"
      ).length,
    };
  }, [orders]);

  // ---------------- LOADING ----------------
  if (loading) return <h2>Loading orders...</h2>;

  return (
    <div className="orders-page">

      {/* HEADER */}
      <div className="page-header">
        <h2>📦 Orders Management</h2>
      </div>

      {/* SUMMARY */}
      <div className="orders-summary">
        <div className="summary-card">
          Total: {summary.total}
        </div>

        <div className="summary-card">
          Pending: {summary.pending}
        </div>

        <div className="summary-card">
          Preparing: {summary.preparing}
        </div>

        <div className="summary-card">
          Delivered: {summary.delivered}
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="orders-toolbar">
        <input
          placeholder="Search customer..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Pending">
            Pending
          </option>
          <option value="Preparing">
            Preparing
          </option>
          <option value="Ready">Ready</option>
          <option value="Delivered">
            Delivered
          </option>
          <option value="Cancelled">
            Cancelled
          </option>
        </select>
      </div>

      {/* TABLE */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => {
              const data =
                order?.attributes || order;
              const id = order.id;

              return (
                <tr key={id}>
                  <td>#{id}</td>

                  <td>
                    {data.customerName}
                  </td>

                  <td>{data.phone}</td>

                  <td>
                    ₹{data.totalAmount}
                  </td>

                  <td>
                    <span
                      className={`status ${
                        data.orderStatus
                          ?.toLowerCase()
                      }`}
                    >
                      {data.orderStatus}
                    </span>
                  </td>

                  <td className="action-cell">
                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                    >
                      View
                    </button>

                    <select
                      value={
                        data.orderStatus
                      }
                      onChange={(e) =>
                        updateStatus(
                          id,
                          e.target.value
                        )
                      }
                    >
                      <option>
                        Pending
                      </option>
                      <option>
                        Preparing
                      </option>
                      <option>
                        Ready
                      </option>
                      <option>
                        Delivered
                      </option>
                      <option>
                        Cancelled
                      </option>
                    </select>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              Order #{selectedOrder.id}
            </h2>

            <p>
              <b>Customer:</b>{" "}
              {
                selectedOrder.attributes
                  ?.customerName
              }
            </p>

            <p>
              <b>Phone:</b>{" "}
              {
                selectedOrder.attributes
                  ?.phone
              }
            </p>

            <p>
              <b>Total:</b> ₹
              {
                selectedOrder.attributes
                  ?.totalAmount
              }
            </p>

            <p>
              <b>Status:</b>{" "}
              {
                selectedOrder.attributes
                  ?.orderStatus
              }
            </p>

            <h4>Items</h4>

            <ul>
              {(
                selectedOrder.attributes
                  ?.items || []
              ).map((item, i) => (
                <li key={i}>
                  {item.name} ×{" "}
                  {item.quantity}
                </li>
              ))}
            </ul>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedOrder(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;