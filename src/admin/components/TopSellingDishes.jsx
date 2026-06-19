import "../styles/TopSellingDishes.css";

function TopSellingDishes({ dishes = [] }) {
  return (
    <div className="top-dishes">
      <h3>Top Selling Dishes</h3>

      {dishes.length === 0 ? (
        <p>No sales data available</p>
      ) : (
        dishes.map((dish, index) => (
          <div
            key={index}
            className="dish-row"
          >
            <span>{dish.name}</span>

            <span>{dish.orders} Orders</span>
          </div>
        ))
      )}
    </div>
  );
}

export default TopSellingDishes;