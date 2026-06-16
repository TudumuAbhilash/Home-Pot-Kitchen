import "../styles/AddMenuItemModal.css";

function EditMenuItemModal({
  isOpen,
  onClose,
  item,
}) {
  if (!isOpen || !item)
    return null;

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <div className="modal-header">
          <h2>Edit Menu Item</h2>

          <button
            onClick={onClose}
            className="close-btn"
          >
            ✕
          </button>
        </div>

        <form className="menu-form">

          <input
            defaultValue={item.name}
          />

          <input
            defaultValue={item.price}
          />

          <button
            className="save-btn"
          >
            Update Item
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditMenuItemModal;