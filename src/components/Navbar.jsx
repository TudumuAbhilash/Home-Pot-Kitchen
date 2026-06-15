import { useState, useEffect } from "react";
import "../styles/Navbar.css";

import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
            onClick={() => setCartOpen(true)}>
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

          <button>
            Order Now
          </button>
        </div>
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)} />
    </header>
  );
}

export default Navbar;