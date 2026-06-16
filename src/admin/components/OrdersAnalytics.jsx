import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function OrdersAnalytics() {
  const data = [
    { month: "Jan", orders: 180 },
    { month: "Feb", orders: 220 },
    { month: "Mar", orders: 290 },
    { month: "Apr", orders: 310 },
    { month: "May", orders: 420 },
    { month: "Jun", orders: 510 },
  ];

  return (
    <div className="chart-card">

      <h3>Orders Growth</h3>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>
          <XAxis dataKey="month" />
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