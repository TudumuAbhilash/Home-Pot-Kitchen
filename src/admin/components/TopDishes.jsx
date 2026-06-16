import "../styles/TopDishes.css";

function TopDishes() {
  const dishes = [
    {
      name: "Chicken Biryani",
      sold: 145,
    },
    {
      name: "Paneer Butter Masala",
      sold: 112,
    },
    {
      name: "Mutton Biryani",
      sold: 98,
    },
    {
      name: "Veg Fried Rice",
      sold: 85,
    },
  ];

  return (
    <div className="top-dishes">

      <h3>Top Selling Dishes</h3>

      {dishes.map((dish, index) => (
        <div
          key={index}
          className="dish-item"
        >
          <span>{dish.name}</span>

          <strong>{dish.sold}</strong>
        </div>
      ))}
    </div>
  );
}

export default TopDishes;