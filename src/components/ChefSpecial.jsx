import "../styles/ChefSpecial.css";

import biryani from "../assets/biryani.jpg";
import ScrollReveal from "./ScrollReveal";

function ChefSpecial() {
  return (
    <ScrollReveal>
    <section className="chef-special">

      <div className="chef-content">

        <span className="chef-tag">
          🔥 TODAY'S SPECIAL
        </span>

        <h2>
          Authentic Chicken
          <br />
          Dum Biryani
        </h2>

        <p>
          Slow-cooked with aromatic spices, premium basmati rice,
          and tender chicken. A customer favorite prepared fresh
          every day.
        </p>

        <div className="offer-box">

          <div>
            <h3>₹249</h3>
            <p>Special Offer Price</p>
          </div>

          <div>
            <h3>20%</h3>
            <p>Off Today</p>
          </div>

        </div>

        <div className="chef-buttons">

          <button className="special-btn">
            Order Now
          </button>

          <button className="menu-outline-btn">
            View Menu
          </button>

        </div>

      </div>

      <div className="chef-image">

        <div className="image-circle"></div>

        <img
          src={biryani}
          alt="Chicken Dum Biryani"
        />

      </div>

    </section>
    </ScrollReveal>
  );
}

export default ChefSpecial;