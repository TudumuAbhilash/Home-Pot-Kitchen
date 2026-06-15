import "../styles/KitchenStandards.css";

function KitchenStandards() {
  return (
    <section className="kitchen-standards">

      <div className="section-header">

        <span>OUR PROMISE</span>

        <h2>Kitchen Standards We Follow</h2>

        <p>
          Every meal is prepared with strict quality,
          hygiene, and freshness standards.
        </p>

      </div>

      <div className="standards-grid">

        <div className="standard-card">
          <div className="standard-icon">🥗</div>

          <h3>Fresh Ingredients</h3>

          <p>
            Daily sourced vegetables, spices,
            and premium ingredients.
          </p>
        </div>

        <div className="standard-card">
          <div className="standard-icon">🧼</div>

          <h3>Hygiene First</h3>

          <p>
            Clean preparation areas and food-safe
            cooking practices.
          </p>
        </div>

        <div className="standard-card">
          <div className="standard-icon">👨‍🍳</div>

          <h3>Expert Cooking</h3>

          <p>
            Traditional recipes prepared with care
            and consistency.
          </p>
        </div>

        <div className="standard-card">
          <div className="standard-icon">🚚</div>

          <h3>Fast Delivery</h3>

          <p>
            Hot and fresh meals delivered quickly
            to your doorstep.
          </p>
        </div>

      </div>

    </section>
  );
}

export default KitchenStandards;