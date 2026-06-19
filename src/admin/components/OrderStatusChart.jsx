import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function OrderStatusChart({ orders = [] }) {
  const statusCounts = {
    Pending: 0,
    Preparing: 0,
    Ready: 0,
    Delivered: 0,
    Cancelled: 0,
  };

  orders.forEach((order) => {
    const data = order.attributes || order;
    const status = data.orderStatus;

    if (statusCounts[status] !== undefined) {
      statusCounts[status]++;
    }
  });

  const chartData = Object.entries(statusCounts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#8b5cf6",
    "#10b981",
    "#ef4444",
  ];

  return (
    <div className="chart-card">
      <h3>Order Status Overview</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={110}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderStatusChart;