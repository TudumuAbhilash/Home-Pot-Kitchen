import { useState } from "react";
import "../styles/AddMenuItemModal.css";

function AddMenuItemModal({
  isOpen,
  onClose,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      category: "",
      price: "",
      available: true,
      image: null,
    });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const [preview, setPreview] =
  useState(null);

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setFormData({
      ...formData,
      image: file,
    });

    setPreview(
      URL.createObjectURL(file)
    );
  }
};

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <div className="modal-header">
          <h2>Add Menu Item</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="menu-form">

          <input
            type="text"
            name="name"
            placeholder="Dish Name"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">
              Select Category
            </option>

            <option>
              Biryani
            </option>

            <option>
              Main Course
            </option>

            <option>
              Rice
            </option>

            <option>
              Starters
            </option>

            <option>
              Desserts
            </option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {preview && (
           <img
           src={preview}
           alt="Preview"
           className="image-preview"
          />
          )}

          <label className="availability">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />

            Available
          </label>

          <button
            type="submit"
            className="save-btn"
          >
            Save Item
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddMenuItemModal;