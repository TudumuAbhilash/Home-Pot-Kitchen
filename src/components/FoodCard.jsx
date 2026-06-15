function FoodCard({ item }) {
  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} />

      <h3>{item.name}</h3>

      <p>₹{item.price}</p>

      <button>Add To Cart</button>
    </div>
  );
}

export default FoodCard;