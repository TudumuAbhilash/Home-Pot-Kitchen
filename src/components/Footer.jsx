import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <h2>Home Pot Kitchen</h2>

          <p>
            Fresh homemade food prepared with care and delivered
            straight to your doorstep.
          </p>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>

        </div>

        {/* CONTACT */}

        <div className="footer-contact">

          <h3>Contact Us</h3>

          <p>📞 +91 98765 43210</p>
          <p>📧 homepotkitchen@gmail.com</p>
          <p>📍 Hyderabad, Telangana</p>

        </div>

        {/* HOURS */}

        <div className="footer-hours">

          <h3>Opening Hours</h3>

          <p>Monday - Friday</p>
          <span>9:00 AM - 10:00 PM</span>

          <p>Saturday - Sunday</p>
          <span>8:00 AM - 11:00 PM</span>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Home Pot Kitchen. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;