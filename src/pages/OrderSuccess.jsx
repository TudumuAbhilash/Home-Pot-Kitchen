import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  const orderId =
    "HPK-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <>
      <Navbar />

      <section className="success-page">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Confirmed!
          </h1>

          <p>
            Thank you for ordering from
            <strong> Home Pot Kitchen</strong>.
          </p>

          <div className="order-info">

            <div>
              <span>Order ID</span>
              <h3>{orderId}</h3>
            </div>

            <div>
              <span>Estimated Delivery</span>
              <h3>30 - 45 Minutes</h3>
            </div>

          </div>

          <div className="success-message">
            Your delicious homemade food is now
            being prepared with fresh ingredients.
          </div>

          <div className="success-buttons">

            <Link
              to="/menu"
              className="secondary-btn"
            >
              Order More
            </Link>

            <Link
              to="/"
              className="primary-btn"
            >
              Back To Home
            </Link>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default OrderSuccess;