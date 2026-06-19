import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import RevenueAnalytics from "../components/RevenueAnalytics";
import OrdersAnalytics from "../components/OrdersAnalytics";
import AnalyticsCards from "../components/AnalyticsCards";

import TopSellingDishes from "../components/TopSellingDishes";
import LatestOrders from "../components/LatestOrders";

import "../styles/Analytics.css";

const API = "http://localhost:1337/api";

function Analytics() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API}/orders?populate=*`);

      setOrders(res?.data?.data || []);
    } catch (err) {
      console.log("Error loading analytics:", err);
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // OPTIONAL: real-time refresh (SaaS upgrade)
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // =========================
  // SAFE ORDERS
  // =========================
  const safeOrders = useMemo(
    () => (Array.isArray(orders) ? orders : []),
    [orders]
  );

  // =========================
  // CORE METRICS
  // =========================
  const totalRevenue = useMemo(() => {
    return safeOrders.reduce((sum, order) => {
      return sum + (order?.attributes?.total || 0);
    }, 0);
  }, [safeOrders]);

  const pendingOrders = safeOrders.filter(
    (o) => o?.attributes?.orderStatus === "Pending"
  ).length;

  const deliveredOrders = safeOrders.filter(
    (o) => o?.attributes?.orderStatus === "Delivered"
  ).length;

  const totalOrders = safeOrders.length;

  const avgOrderValue = totalOrders
    ? (totalRevenue / totalOrders).toFixed(2)
    : 0;

  // =========================
  // AI INSIGHTS (PEAK HOUR)
  // =========================
  const peakHour = useMemo(() => {
    const hourMap = {};

    safeOrders.forEach((order) => {
      const hour = new Date(order?.attributes?.createdAt).getHours();
      hourMap[hour] = (hourMap[hour] || 0) + 1;
    });

    return Object.keys(hourMap).reduce((a, b) =>
      hourMap[a] > hourMap[b] ? a : b
    , 0);
  }, [safeOrders]);

  const isHighDemandTime = peakHour >= 18 && peakHour <= 22;

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="analytics-page">
        <h2>📊 Loading Analytics...</h2>
      </div>
    );
  }

  // =========================
  // ERROR STATE
  // =========================
  if (error) {
    return (
      <div className="analytics-page">
        <h2>⚠ {error}</h2>
      </div>
    );
  }

  return (
    <div className="analytics-page">

      {/* HEADER */}
      <div className="analytics-header">
        <h2>📊 Business Analytics Dashboard</h2>

        <select>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      {/* SUMMARY CARDS */}
      <AnalyticsCards
        orders={safeOrders}
        stats={{
          totalRevenue,
          pendingOrders,
          deliveredOrders,
          totalOrders,
          avgOrderValue,
        }}
      />

      {/* AI INSIGHTS */}
      <div className="ai-insights">
        <h3>🧠 AI Insights</h3>

        <p>🔥 Peak Hour: <b>{peakHour}:00</b></p>

        {isHighDemandTime ? (
          <p>⚠ High demand period detected. Consider increasing kitchen staff.</p>
        ) : (
          <p>📈 Demand is stable during this time window.</p>
        )}

        <p>💰 Avg Order Value: ₹{avgOrderValue}</p>
      </div>

      {/* CHARTS SECTION */}
      <div className="analytics-charts">
        <RevenueAnalytics orders={safeOrders} />
        <OrdersAnalytics orders={safeOrders} />
      </div>

      {/* INSIGHTS SECTION */}
      <div className="analytics-charts">
        <TopSellingDishes orders={safeOrders} />
        <LatestOrders orders={safeOrders} />
      </div>

    </div>
  );
}

export default Analytics;