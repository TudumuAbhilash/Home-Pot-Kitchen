import "../styles/RevenueCard.css";

function RevenueCard({
  revenue = 0,
  totalOrders = 0,
}) {
  return (
    <div className="revenue-card">
      <h3>Total Revenue</h3>

      <h1>₹{revenue.toLocaleString()}</h1>

      <p>{totalOrders} Orders Received</p>
    </div>
  );
}

export default RevenueCard;