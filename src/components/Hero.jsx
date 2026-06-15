import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">

          <span className="hero-tag">
            🍲 Fresh • Homemade • Delivered
          </span>

          <h1>
            Delicious Homemade Food
            <br />
            Delivered To Your Doorstep
          </h1>

          <p>
            Experience authentic homemade flavors prepared with fresh
            ingredients and delivered hot from Home Pot Kitchen.
          </p>

          <div className="hero-buttons">
            <button className="order-btn">
              Order Now
            </button>

            <button className="menu-btn">
              View Menu
            </button>
          </div>

          <div className="hero-stats">

            <div className="stat">
              <h3>500+</h3>
              <p>Orders Delivered</p>
            </div>

            <div className="stat">
              <h3>100%</h3>
              <p>Fresh Ingredients</p>
            </div>

            <div className="stat">
              <h3>4.9★</h3>
              <p>Customer Rating</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;