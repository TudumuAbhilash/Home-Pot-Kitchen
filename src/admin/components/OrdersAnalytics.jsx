import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function OrdersAnalytics({ orders = [] }) {
  const [range, setRange] = useState(30);
  const [data, setData] = useState([]);

  const getOrderData = (order) =>
    order.attributes || order;

  const filteredOrders = useMemo(() => {
    const now = new Date();
    const pastDate = new Date();

    pastDate.setDate(now.getDate() - range);

    return orders.filter((order) => {
      const data = getOrderData(order);

      if (!data.createdAt) return false;

      return new Date(data.createdAt) >= pastDate;
    });
  }, [orders, range]);

  useEffect(() => {
    const ordersMap = {};

    filteredOrders.forEach((order) => {
      const data = getOrderData(order);

      if (!data.createdAt) return;

      const date = new Date(data.createdAt)
        .toISOString()
        .split("T")[0];

      ordersMap[date] =
        (ordersMap[date] || 0) + 1;
    });

    const chartData = Object.entries(
      ordersMap
    )
      .map(([date, count]) => ({
        date,
        orders: count,
      }))
      .sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      );

    setData(chartData);
  }, [filteredOrders]);

  const growth = useMemo(() => {
    if (data.length < 2) return 0;

    const first = data[0]?.orders || 0;
    const last =
      data[data.length - 1]?.orders || 0;

    if (first === 0) return 0;

    return Math.round(
      ((last - first) / first) * 100
    );
  }, [data]);

  return (
    <div className="chart-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Orders Growth</h3>

        <select
          value={range}
          onChange={(e) =>
            setRange(Number(e.target.value))
          }
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>
      </div>

      <p>
        Growth:
        <b
          style={{
            color:
              growth >= 0
                ? "green"
                : "red",
          }}
        >
          {" "}
          {growth}%
        </b>
      </p>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="orders"
            fill="#f97316"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersAnalytics;