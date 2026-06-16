import "../styles/TopSellingDishes.css";

function TopSellingDishes() {
  const dishes = [
    {
      name: "Chicken Biryani",
      orders: 245,
    },
    {
      name: "Paneer Butter Masala",
      orders: 198,
    },
    {
      name: "Mutton Curry",
      orders: 165,
    },
    {
      name: "Veg Fried Rice",
      orders: 140,
    },
  ];

  return (
    <div className="top-dishes">

      <h3>Top Selling Dishes</h3>

      {dishes.map((dish, index) => (
        <div
          key={index}
          className="dish-row"
        >
          <span>{dish.name}</span>

          <span>
            {dish.orders} Orders
          </span>
        </div>
      ))}

    </div>
  );
}

export default TopSellingDishes;