import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Navbar.css";

import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

import { useAdminAuth } from "../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Hide navbar on admin routes
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { totalItems } = useCart();

  const { logout } = useAdminAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/admin/login");
};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="navbar-container">
          <div className="logo">
            🍲 Home Pot Kitchen
          </div>

          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/menu">Menu</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <a
              href="https://wa.me/919876543210"
              className="whatsapp-btn"
            >
              WhatsApp
            </a>

            <button
              className="order-btn-nav"
              onClick={() => setCartOpen(true)}
            >
              Cart ({totalItems})
            </button>

            <div
              className="hamburger"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              ☰
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <a href="/">Home</a>
            <a href="/menu">Menu</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>

            <button>Order Now</button>
          </div>
        )}
      </header>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}

export default Navbar;