import "../styles/RecentOrders.css";

function RecentOrders() {
  const orders = [
    {
      id: "#1001",
      customer: "Rahul",
      item: "Chicken Biryani",
      amount: "₹299",
      status: "Delivered",
    },
    {
      id: "#1002",
      customer: "Priya",
      item: "Paneer Butter Masala",
      amount: "₹249",
      status: "Preparing",
    },
    {
      id: "#1003",
      customer: "Arjun",
      item: "Veg Fried Rice",
      amount: "₹199",
      status: "Pending",
    },
    {
      id: "#1004",
      customer: "Sneha",
      item: "Mutton Biryani",
      amount: "₹399",
      status: "Delivered",
    },
  ];

  return (
    <div className="recent-orders">

      <div className="section-header">
        <h3>Recent Orders</h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.item}</td>
              <td>{order.amount}</td>

              <td>
                <span
                  className={`status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default RecentOrders;