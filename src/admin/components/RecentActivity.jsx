import "../styles/RecentActivity.css";

function RecentActivity() {
  const activities = [
    "Rahul ordered Chicken Biryani",
    "Priya completed payment",
    "Menu item updated",
    "New customer registered",
    "Order #1024 delivered",
  ];

  return (
    <div className="recent-activity">

      <h3>Recent Activity</h3>

      {activities.map(
        (activity, index) => (
          <div
            key={index}
            className="activity-item"
          >
            ✓ {activity}
          </div>
        )
      )}

    </div>
  );
}

export default RecentActivity;