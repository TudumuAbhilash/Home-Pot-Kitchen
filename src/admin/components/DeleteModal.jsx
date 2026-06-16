import "../styles/DeleteModal.css";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="delete-modal">

        <h3>
          Delete Menu Item?
        </h3>

        <p>
          This action cannot be
          undone.
        </p>

        <div className="delete-actions">

          <button
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-confirm"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;