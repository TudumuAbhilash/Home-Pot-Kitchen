import "../styles/HowItWorks.css";
import ScrollReveal from "./ScrollReveal";

function HowItWorks() {
  return (
    <ScrollReveal>
      <section className="how-it-works">

        <div className="how-header">

          <span>HOW IT WORKS</span>

          <h2>
            Fresh Food In Four Simple Steps
          </h2>

          <p>
            Ordering from Home Pot Kitchen is quick, easy,
            and designed to deliver homemade goodness to your door.
          </p>

        </div>

        <div className="steps-grid">

          <div className="step-card">
            <div className="step-number">1</div>

            <h3>Choose Your Meal</h3>

            <p>
              Browse our menu and select your favorite dishes.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>

            <h3>Place Your Order</h3>

            <p>
              Order online or through WhatsApp in seconds.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>

            <h3>We Cook Fresh</h3>

            <p>
              Every order is freshly prepared with quality ingredients.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>

            <h3>Delivered Hot</h3>

            <p>
              Enjoy hot and delicious homemade food at your doorstep.
            </p>
          </div>

        </div>

      </section>
    </ScrollReveal>
  );
}

export default HowItWorks;