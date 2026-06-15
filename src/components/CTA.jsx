import "../styles/CTA.css";
import ScrollReveal from "./ScrollReveal";

function CTA() {
  return (
    <ScrollReveal>
    <section className="cta">

      <div className="cta-container">

        <span>READY TO ORDER?</span>

        <h2>
          Fresh Homemade Food
          <br />
          Delivered To Your Doorstep
        </h2>

        <p>
          Experience authentic homemade flavors prepared with fresh
          ingredients and delivered hot every day.
        </p>

        <div className="cta-buttons">

          <button className="cta-order-btn">
            Order Now
          </button>

          <button className="cta-call-btn">
            Call Us
          </button>

        </div>

      </div>

    </section>
    </ScrollReveal>
  );
}

export default CTA;