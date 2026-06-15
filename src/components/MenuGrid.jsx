import { useState } from "react";
import "../styles/MenuGrid.css";

import biryani from "../assets/biryani.jpg";
import paneer from "../assets/paneer.jpg";
import meal from "../assets/meal.jpg";

import { useCart } from "../context/CartContext";

function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState("Biryani");
  const { addToCart } = useCart();

  const menuItems = [
    {
      id: 1,
      name: "Chicken Dum Biryani",
      category: "Biryani",
      price: "₹249",
      image: biryani,
      rating: "4.9",
    },
    {
      id: 2,
      name: "Paneer Biryani",
      category: "Biryani",
      price: "₹219",
      image: paneer,
      rating: "4.8",
    },
    {
      id: 3,
      name: "South Indian Meal",
      category: "Meals",
      price: "₹179",
      image: meal,
      rating: "4.7",
    },
    {
      id: 4,
      name: "Veg Meal",
      category: "Meals",
      price: "₹149",
      image: meal,
      rating: "4.6",
    },
  ];

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="menu-grid-section">

      <div className="menu-filter">

        <button
          className={activeCategory === "Biryani" ? "active" : ""}
          onClick={() => setActiveCategory("Biryani")}
        >
          🍛 Biryani
        </button>

        <button
          className={activeCategory === "Meals" ? "active" : ""}
          onClick={() => setActiveCategory("Meals")}
        >
          🥘 Meals
        </button>

      </div>

      <div className="menu-grid">

        {filteredItems.map((item) => (
          <div className="menu-card" key={item.id}>

            <div className="menu-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="menu-content">

              <h3>{item.name}</h3>

              <div className="menu-rating">
                ⭐ {item.rating}
              </div>

              <div className="menu-bottom">

                <span>{item.price}</span>

               <button
               onClick={() => addToCart(item)}>
               Add To Cart
               </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default MenuGrid;