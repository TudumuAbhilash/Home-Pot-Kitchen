import { useState } from "react";
import "../styles/Orders.css";

function Orders() {
  const [statusFilter, setStatusFilter] =
    useState("All");

  const orders = [
    {
      id: "#1001",
      customer: "Rahul",
      phone: "9876543210",
      amount: "₹299",
      status: "Delivered",
    },
    {
      id: "#1002",
      customer: "Priya",
      phone: "9876543211",
      amount: "₹249",
      status: "Preparing",
    },
    {
      id: "#1003",
      customer: "Arjun",
      phone: "9876543212",
      amount: "₹199",
      status: "Pending",
    },
    {
      id: "#1004",
      customer: "Sneha",
      phone: "9876543213",
      amount: "₹399",
      status: "Delivered",
    },
  ];

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter(
          (order) =>
            order.status === statusFilter
        );

  return (
    <div className="orders-page">

      <div className="page-header">
        <h2>Orders Management</h2>
      </div>

      <div className="orders-toolbar">

        <input
          type="text"
          placeholder="Search orders..."
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >
          <option>All</option>
          <option>Pending</option>
          <option>Preparing</option>
          <option>Delivered</option>
        </select>

      </div>

      <div className="orders-table-container">

        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.map(
              (order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.phone}</td>
                  <td>{order.amount}</td>

                  <td>
                    <span
                      className={`status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button className="view-btn">
                      View
                    </button>

                    <button className="edit-btn">
                      Update
                    </button>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;