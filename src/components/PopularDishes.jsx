import "../styles/PopularDishes.css";

import biryani from "../assets/biryani.jpg";
import paneer from "../assets/paneer.jpg";
import meal from "../assets/meal.jpg";

import ScrollReveal from "./ScrollReveal";

const dishes = [
  {
    id: 1,
    name: "Chicken Dum Biryani",
    image: biryani,
    price: "₹249",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    image: paneer,
    price: "₹199",
    tag: "Popular",
  },
  {
    id: 3,
    name: "South Indian Meal",
    image: meal,
    price: "₹179",
    tag: "Fresh",
  },
];

function PopularDishes() {
  return (
    <ScrollReveal>
    <section className="popular-section">

      <div className="popular-header">

        <span>POPULAR DISHES</span>

        <h2>
          Customer Favorites
        </h2>

        <p>
          Prepared fresh every day and loved by our customers.
        </p>

      </div>

      <div className="popular-grid">

        {dishes.map((dish) => (
          <div className="popular-card" key={dish.id}>

            <div className="popular-image">

              <img src={dish.image} alt={dish.name} />

              <div className="popular-tag">
                {dish.tag}
              </div>

            </div>

            <div className="popular-content">

              <h3>{dish.name}</h3>

              <div className="popular-footer">

                <span>{dish.price}</span>

                <button>
                  Order
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
    </ScrollReveal>
  );
}

export default PopularDishes;