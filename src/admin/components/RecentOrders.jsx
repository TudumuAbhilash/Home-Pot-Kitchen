import "../styles/RecentOrders.css";

function RecentOrders({ orders = [] }) {
  return (
    <div className="recent-orders">
      <div className="section-header">
        <h3>Recent Orders</h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4">
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>

                <td>{order.customer}</td>

                <td>₹{order.amount}</td>

                <td>
                  <span
                    className={`status ${order.status?.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;