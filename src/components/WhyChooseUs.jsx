import "../styles/WhyChooseUs.css";
import meal from "../assets/meal.jpg";
import ScrollReveal from "./ScrollReveal";

function WhyChooseUs() {
  return (
    <ScrollReveal>
    <section className="why-section">
      <div className="why-container">

        <div className="why-image">
          <img src={meal} alt="Home Pot Kitchen Meal" />
        </div>

        <div className="why-content">

          <span className="why-tag">
            WHY CHOOSE HOME POT KITCHEN
          </span>

          <h2>
            Bringing Homemade Comfort
            <br />
            To Every Meal
          </h2>

          <p className="why-description">
            We prepare every dish with fresh ingredients,
            traditional recipes, and the care of home cooking.
            Enjoy delicious meals delivered fresh to your doorstep.
          </p>

          <div className="benefits-grid">

            <div className="benefit-item">
              <div className="benefit-icon">🥗</div>
              <div>
                <h3>Fresh Ingredients</h3>
                <p>Handpicked daily for quality and taste.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🍲</div>
              <div>
                <h3>Homemade Recipes</h3>
                <p>Authentic flavors made with love.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🧼</div>
              <div>
                <h3>Hygienic Kitchen</h3>
                <p>Prepared in a clean environment.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🚚</div>
              <div>
                <h3>Fast Delivery</h3>
                <p>Hot meals delivered quickly.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
    </ScrollReveal>
  );
}

export default WhyChooseUs;