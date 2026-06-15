import "../styles/AboutTestimonials.css";

function AboutTestimonials() {
  return (
    <section className="about-testimonials">

      <div className="section-header">

        <span>WHAT OUR CUSTOMERS SAY</span>

        <h2>Loved By Food Enthusiasts</h2>

        <p>
          Hear what our customers have to say about
          their experience with Home Pot Kitchen.
        </p>

      </div>

      <div className="testimonial-grid">

        <div className="testimonial-card">

          <div className="stars">
            ★★★★★
          </div>

          <p>
            The biryani tasted exactly like homemade
            food. Fresh, flavorful, and perfectly cooked.
          </p>

          <div className="customer">
            <h4>Rahul Kumar</h4>
            <span>Regular Customer</span>
          </div>

        </div>

        <div className="testimonial-card featured">

          <div className="stars">
            ★★★★★
          </div>

          <p>
            Amazing quality and hygiene. The meals are
            always delivered hot and fresh.
          </p>

          <div className="customer">
            <h4>Priya Sharma</h4>
            <span>Food Blogger</span>
          </div>

        </div>

        <div className="testimonial-card">

          <div className="stars">
            ★★★★★
          </div>

          <p>
            Best cloud kitchen experience I've had.
            Great portions and authentic taste.
          </p>

          <div className="customer">
            <h4>Arjun Reddy</h4>
            <span>Loyal Customer</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutTestimonials;