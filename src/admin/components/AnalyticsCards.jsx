import "../styles/AnalyticsCards.css";

function AnalyticsCards() {
  return (
    <div className="analytics-cards">

      <div className="analytics-card">
        <h4>Total Revenue</h4>
        <h2>₹4,52,000</h2>
      </div>

      <div className="analytics-card">
        <h4>Total Orders</h4>
        <h2>2,145</h2>
      </div>

      <div className="analytics-card">
        <h4>New Customers</h4>
        <h2>245</h2>
      </div>

      <div className="analytics-card">
        <h4>Average Order Value</h4>
        <h2>₹320</h2>
      </div>

    </div>
  );
}

export default AnalyticsCards;