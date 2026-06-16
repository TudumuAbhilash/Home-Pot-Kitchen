import StatCard from "../components/StatCard";
import RecentOrders from "../components/RecentOrders";
import RevenueCard from "../components/RevenueCard";
import SalesChart from "../components/SalesChart";
import TopDishes from "../components/TopDishes"; 
//import RecentActivity from "../components/RecentActivity";
//import TopSellingDishes from "../components/TopSellingDishes";
//import LatestOrders from "../components/LatestOrders";
//import QuickActions from "../components/QuickActions";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div>

      <div className="stats-grid">

        <StatCard
          title="Total Orders"
          value="245"
          growth="+12%"
        />

        <StatCard
          title="Revenue"
          value="₹45,000"
          growth="+18%"
        />

        <StatCard
          title="Customers"
          value="120"
          growth="+7%"
        />

        <StatCard
          title="Menu Items"
          value="35"
          growth="+3%"
        />

      </div>

      <div className="dashboard-bottom">
        <RecentOrders />
        <RevenueCard />
      </div>

      <div className="dashboard-analytics">
        <SalesChart />
        <TopDishes />
      </div>

      {/*<div style={{ marginTop: "30px" }}>
         <RecentActivity />
    </div>

    <div className="dashboard-widgets">

  <RecentActivity />

  <TopSellingDishes />

  <LatestOrders />

  <QuickActions />

</div>*/}

    </div>
  );
}

export default Dashboard;