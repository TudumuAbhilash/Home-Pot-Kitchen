import "../styles/AboutStory.css";

function AboutStory() {
  return (
    <section className="about-story">

      <div className="story-left">

        <span>OUR STORY</span>

        <h2>
          Food Made With Care,
          Just Like Home
        </h2>

        <p>
          Home Pot Kitchen was started with one
          simple goal — delivering homemade food
          that is fresh, hygienic, and delicious.
        </p>

        <p>
          Every meal is prepared using carefully
          selected ingredients and traditional
          cooking methods that bring comfort
          and authentic taste.
        </p>

      </div>

      <div className="story-right">

        <div className="story-card">
          <h3>500+</h3>
          <p>Happy Customers</p>
        </div>

        <div className="story-card">
          <h3>100%</h3>
          <p>Fresh Ingredients</p>
        </div>

        <div className="story-card">
          <h3>4.9★</h3>
          <p>Average Rating</p>
        </div>

        <div className="story-card">
          <h3>30+</h3>
          <p>Menu Items</p>
        </div>

      </div>

    </section>
  );
}

export default AboutStory;