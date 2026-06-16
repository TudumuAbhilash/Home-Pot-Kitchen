import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function RevenueAnalytics() {
  const data = [
    { month: "Jan", revenue: 25000 },
    { month: "Feb", revenue: 32000 },
    { month: "Mar", revenue: 42000 },
    { month: "Apr", revenue: 38000 },
    { month: "May", revenue: 51000 },
    { month: "Jun", revenue: 62000 },
  ];

  return (
    <div className="chart-card">

      <h3>Revenue Trend</h3>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#f97316"
            fill="#fed7aa"
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}

export default RevenueAnalytics;