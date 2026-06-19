function StatCard({
  title,
  value,
  growth,
}) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>

      <h2>{value}</h2>

      {growth && <p>{growth}</p>}
    </div>
  );
}

export default StatCard;