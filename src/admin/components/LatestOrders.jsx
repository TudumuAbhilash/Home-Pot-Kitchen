import "../styles/LatestOrders.css";

function LatestOrders() {
  const orders = [
    {
      id: "#1024",
      customer: "Rahul",
      amount: "₹520",
    },
    {
      id: "#1025",
      customer: "Priya",
      amount: "₹380",
    },
    {
      id: "#1026",
      customer: "Arjun",
      amount: "₹620",
    },
  ];

  return (
    <div className="latest-orders">

      <h3>Latest Orders</h3>

      {orders.map((order) => (
        <div
          key={order.id}
          className="order-row"
        >
          <div>
            <strong>
              {order.id}
            </strong>

            <p>
              {order.customer}
            </p>
          </div>

          <span>
            {order.amount}
          </span>
        </div>
      ))}

    </div>
  );
}

export default LatestOrders;