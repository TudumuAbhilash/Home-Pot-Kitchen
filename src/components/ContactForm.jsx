import "../styles/ContactForm.css";

function ContactForm() {
  return (
    <section className="contact-form-section">

      <div className="contact-form-container">

        <div className="form-left">

          <span>SEND US A MESSAGE</span>

          <h2>
            Let's Start A Conversation
          </h2>

          <p>
            Fill out the form and we'll get back
            to you as soon as possible.
          </p>

        </div>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="tel"
            placeholder="Phone Number"
          />

          <textarea
            rows="6"
            placeholder="Your Message"
          />

          <button>
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default ContactForm;