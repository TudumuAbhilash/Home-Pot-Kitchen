import "../styles/AnalyticsCards.css";

function AnalyticsCards({ orders }) {
  // safeguard
  const safeOrders = orders || [];

  // Total revenue
  const totalRevenue = safeOrders.reduce(
    (sum, o) => sum + (o.attributes?.totalAmount || 0),
    0
  );

  // Total orders
  const totalOrders = safeOrders.length;

  // New customers (simple approximation: unique phone/email if exists)
  const uniqueCustomers = new Set(
    safeOrders.map((o) => o.attributes?.phone || o.attributes?.email)
  ).size;

  // Average order value
  const avgOrderValue =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="analytics-cards">

      <div className="analytics-card">
        <h4>Total Revenue</h4>
        <h2>₹{totalRevenue}</h2>
      </div>

      <div className="analytics-card">
        <h4>Total Orders</h4>
        <h2>{totalOrders}</h2>
      </div>

      <div className="analytics-card">
        <h4>New Customers</h4>
        <h2>{uniqueCustomers}</h2>
      </div>

      <div className="analytics-card">
        <h4>Average Order Value</h4>
        <h2>₹{avgOrderValue}</h2>
      </div>

    </div>
  );
}

export default AnalyticsCards;