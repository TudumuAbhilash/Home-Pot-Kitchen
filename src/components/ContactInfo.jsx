import "../styles/ContactInfo.css";

function ContactInfo() {
  return (
    <section className="contact-info">

      <div className="info-card">
        <div className="info-icon">📞</div>
        <h3>Phone</h3>
        <p>+91 98765 43210</p>
      </div>

      <div className="info-card">
        <div className="info-icon">📧</div>
        <h3>Email</h3>
        <p>info@homepotkitchen.com</p>
      </div>

      <div className="info-card">
        <div className="info-icon">📍</div>
        <h3>Location</h3>
        <p>Hyderabad, Telangana</p>
      </div>

    </section>
  );
}

export default ContactInfo;