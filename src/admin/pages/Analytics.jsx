import RevenueAnalytics from "../components/RevenueAnalytics";
import OrdersAnalytics from "../components/OrdersAnalytics";
import AnalyticsCards from "../components/AnalyticsCards";

import "../styles/Analytics.css";

function Analytics() {
  return (
    <div className="analytics-page">

      <div className="analytics-header">
        <h2>Business Analytics</h2>

        <select>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      <AnalyticsCards />

      <div className="analytics-charts">

        <RevenueAnalytics />

        <OrdersAnalytics />

      </div>

    </div>
  );
}

export default Analytics;