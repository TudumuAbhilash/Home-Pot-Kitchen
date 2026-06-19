import { useEffect, useState } from "react";
import { getOrders, getMenuItems } from "../../api/strapi";

import StatCard from "../components/StatCard";
import RevenueCard from "../components/RevenueCard";
import TopSellingDishes from "../components/TopSellingDishes";
import TopCustomers from "../components/TopCustomers";
import RecentOrders from "../components/RecentOrders";

import RevenueAnalytics from "../components/RevenueAnalytics";
import OrdersAnalytics from "../components/OrdersAnalytics";
import OrderStatusChart from "../components/OrderStatusChart";

import ExportOrdersButton from "../components/ExportOrdersButton";

import alertSound from "../../assets/order-alert.mp3";
 import "../styles/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalMenuItems: 0,

    todayOrders: 0,
    todayRevenue: 0,

    pendingOrders: 0,
    deliveredOrders: 0,
  });

  const [allOrders, setAllOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSellingDishes, setTopSellingDishes] =
    useState([]);

  const [topCustomers, setTopCustomers] =
    useState([]);

  const [newOrders, setNewOrders] = useState(0);

  const [previousOrderCount, setPreviousOrderCount] =
    useState(0);

  const fetchDashboardData = async () => {
    try {
      const ordersRes = await getOrders();
      const menusRes = await getMenuItems();

      const orders = ordersRes?.data || [];
      const menus = menusRes?.data || [];

      if (
        previousOrderCount > 0 &&
        orders.length > previousOrderCount
      ) {
        const newCount =
          orders.length - previousOrderCount;

        setNewOrders(newCount);

        try {
          new Audio(alertSound).play();
        } catch (err) {
          console.log(
            "Audio autoplay blocked:",
            err
          );
        }
      }

      setPreviousOrderCount(orders.length);
      setAllOrders(orders);

      let totalRevenue = 0;

      const customers = new Set();

      const dishMap = {};

      const customerMap = {};

      let todayOrders = 0;
      let todayRevenue = 0;

      let pendingOrders = 0;
      let deliveredOrders = 0;

      const today =
        new Date().toDateString();

      orders.forEach((order) => {
        const data =
          order.attributes || order;

        totalRevenue += Number(
          data.totalAmount || 0
        );

        if (data.customerName) {
          customers.add(data.customerName);
        }

        // TOP CUSTOMERS
        if (data.customerName) {
  if (!customerMap[data.customerName]) {
    customerMap[data.customerName] = {
      orders: 0,
      spent: 0,
    };
  }

  customerMap[data.customerName].orders += 1;
  customerMap[data.customerName].spent += Number(
    data.totalAmount || 0
  );
}

        // TODAY STATS
        if (
          new Date(
            data.createdAt
          ).toDateString() === today
        ) {
          todayOrders++;

          todayRevenue += Number(
            data.totalAmount || 0
          );
        }

        // STATUS COUNTS
        if (
          data.orderStatus ===
          "Pending"
        ) {
          pendingOrders++;
        }

        if (
          data.orderStatus ===
          "Delivered"
        ) {
          deliveredOrders++;
        }

        // TOP DISHES
        if (Array.isArray(data.items)) {
          data.items.forEach((item) => {
            dishMap[item.name] =
              (dishMap[item.name] || 0) +
              Number(item.quantity || 0);
          });
        }
      });

      const topDishes = Object.entries(
        dishMap
      )
        .map(([name, orders]) => ({
          name,
          orders,
        }))
        .sort(
          (a, b) =>
            b.orders - a.orders
        )
        .slice(0, 5);

      const topCustomerList = Object.entries(
  customerMap
)
  .map(([name, value]) => ({
    name,
    orders: value.orders,
    spent: value.spent,
  }))
  .sort((a, b) => b.spent - a.spent)
  .slice(0, 5);

setTopCustomers(topCustomerList);
       
      const latestOrders = [...orders]
        .reverse()
        .slice(0, 5)
        .map((order) => {
          const data =
            order.attributes || order;

          return {
            id: order.id,
            customer:
              data.customerName,
            amount:
              data.totalAmount,
            status:
              data.orderStatus,
          };
        });
         

        
      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalCustomers:
          customers.size,
        totalMenuItems:
          menus.length,

        todayOrders,
        todayRevenue,

        pendingOrders,
        deliveredOrders,
      });

      setTopSellingDishes(topDishes);
      setTopCustomers(topCustomerList);
      setRecentOrders(latestOrders);
    } catch (error) {
      console.log(
        "Dashboard Error:",
        error
      );
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(
      fetchDashboardData,
      5000
    );

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-header">
      <h1>
        🏠 HomePot Admin Dashboard
      </h1>

      <ExportOrdersButton
        orders={allOrders}
      />

      {newOrders > 0 && (
        <div className="notification-banner">
          <span>
            🔔 {newOrders} New Order(s)
          </span>

          <button
            className="clear-notification-btn"
            onClick={() =>
              setNewOrders(0)
            }
          >
            Clear
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="stats-grid">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
        />

        <StatCard
          title="Customers"
          value={stats.totalCustomers}
        />

        <StatCard
          title="Menu Items"
          value={stats.totalMenuItems}
        />

        <StatCard
          title="Today's Orders"
          value={stats.todayOrders}
        />

        <StatCard
          title="Today's Revenue"
          value={`₹${stats.todayRevenue}`}
        />

        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
        />

        <StatCard
          title="Delivered Orders"
          value={stats.deliveredOrders}
        />
      </div>

      {/* ANALYTICS */}
      <div className="dashboard-analytics">
        <RevenueAnalytics
          orders={allOrders}
        />

        <OrdersAnalytics
          orders={allOrders}
        />

        <OrderStatusChart
          orders={allOrders}
        />
      </div>

      {/* WIDGETS */}
      <div className="dashboard-widgets">
        <RevenueCard
          revenue={stats.totalRevenue}
          totalOrders={stats.totalOrders}
        />

        <TopSellingDishes
          dishes={topSellingDishes}
        />

        <TopCustomers
          customers={topCustomers}
        />
      </div>

      {/* RECENT ORDERS */}
      <div className="dashboard-bottom">
        <RecentOrders
          orders={recentOrders}
        />
      </div>
    </div>
  );
}

export default Dashboard;