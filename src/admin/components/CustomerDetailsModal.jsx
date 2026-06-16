import "../styles/CustomerDetailsModal.css";

function CustomerDetailsModal({
  isOpen,
  onClose,
  customer,
}) {
  if (!isOpen || !customer)
    return null;

  return (
    <div className="modal-overlay">

      <div className="customer-modal">

        <div className="modal-header">
          <h2>{customer.name}</h2>

          <button
            onClick={onClose}
            className="close-btn"
          >
            ✕
          </button>
        </div>

        <div className="customer-info">

          <p>
            <strong>Phone:</strong>
            {customer.phone}
          </p>

          <p>
            <strong>Total Orders:</strong>
            {customer.orders}
          </p>

          <p>
            <strong>Total Spend:</strong>
            {customer.spend}
          </p>

          <p>
            <strong>Last Order:</strong>
            {customer.lastOrder}
          </p>

        </div>

      </div>

    </div>
  );
}

export default CustomerDetailsModal;