import "../styles/MeetKitchen.css";

function MeetKitchen() {
  return (
    <section className="meet-kitchen">

      <div className="meet-left">

        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
          alt="Kitchen"
        />

      </div>

      <div className="meet-right">

        <span>MEET OUR KITCHEN</span>

        <h2>
          Homemade Quality
          With Professional Standards
        </h2>

        <p>
          At Home Pot Kitchen, every dish is prepared
          with care using fresh ingredients and
          traditional recipes.
        </p>

        <p>
          We believe food should be nutritious,
          hygienic, and full of authentic flavors.
          That's why every order is freshly cooked
          and packed with attention to detail.
        </p>

        <div className="trust-badges">

          <div className="trust-item">
            ✓ Fresh Daily
          </div>

          <div className="trust-item">
            ✓ Hygienic Kitchen
          </div>

          <div className="trust-item">
            ✓ Premium Ingredients
          </div>

          <div className="trust-item">
            ✓ Fast Delivery
          </div>

        </div>

      </div>

    </section>
  );
}

export default MeetKitchen;