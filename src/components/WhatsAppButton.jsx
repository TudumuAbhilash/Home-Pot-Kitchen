import "../styles/WhatsAppButton.css";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating"
    >
      <span>💬</span>
      <span className="whatsapp-text">
        Order on WhatsApp
      </span>
    </a>
  );
}

export default WhatsAppButton;