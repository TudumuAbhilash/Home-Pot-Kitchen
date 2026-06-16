import "../styles/AboutStats.css";

function AboutStats() {
  return (
    <section className="about-stats">

      <div className="stats-overlay">

        <div className="stats-header">

          <span>OUR ACHIEVEMENTS</span>

          <h2>
            Trusted By Hundreds Of Food Lovers
          </h2>

          <p>
            We take pride in delivering quality,
            consistency, and homemade flavors every day.
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-box">
            <h3>500+</h3>
            <p>Orders Delivered</p>
          </div>

          <div className="stat-box">
            <h3>100%</h3>
            <p>Fresh Ingredients</p>
          </div>

          <div className="stat-box">
            <h3>4.9★</h3>
            <p>Customer Rating</p>
          </div>

          <div className="stat-box">
            <h3>30+</h3>
            <p>Signature Dishes</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutStats;