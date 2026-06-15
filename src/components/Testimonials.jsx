import "../styles/Testimonials.css";

import ScrollReveal from "./ScrollReveal";

const reviews = [
  {
    id: 1,
    name: "Rahul Kumar",
    review:
      "The biryani tasted exactly like homemade food. Fresh, flavorful and delivered hot. Highly recommended!",
    rating: "★★★★★",
  },
  {
    id: 2,
    name: "Priya Sharma",
    review:
      "Amazing quality and hygiene. The South Indian meal reminded me of home-cooked food.",
    rating: "★★★★★",
  },
  {
    id: 3,
    name: "Vikram Reddy",
    review:
      "Fast delivery and excellent taste. One of the best cloud kitchens I've ordered from.",
    rating: "★★★★★",
  },
];

function Testimonials() {
  return (
    <ScrollReveal>
    <section className="testimonials">

      <div className="testimonial-header">

        <span>CUSTOMER REVIEWS</span>

        <h2>What Our Customers Say</h2>

        <p>
          Hundreds of happy customers trust Home Pot Kitchen
          for fresh and delicious homemade meals.
        </p>

      </div>

      <div className="testimonial-grid">

        {reviews.map((review) => (
          <div className="testimonial-card" key={review.id}>

            <div className="stars">
              {review.rating}
            </div>

            <p className="review-text">
              "{review.review}"
            </p>

            <div className="customer-info">

              <div className="avatar">
                {review.name.charAt(0)}
              </div>

              <div>
                <h4>{review.name}</h4>
                <span>Verified Customer</span>
              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
    </ScrollReveal>
  );
}

export default Testimonials;