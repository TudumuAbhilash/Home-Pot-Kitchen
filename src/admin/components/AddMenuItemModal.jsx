import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddMenuItemModal.css";

function AddMenuItemModal({
  isOpen,
  onClose,
  editingItem,
}) {
  const initialState = {
    name: "",
    description: "",
    category: "",
    price: "",
    isAvailable: true,
    image: null,
  };

  const [formData, setFormData] =
    useState(initialState);

  const [preview, setPreview] =
    useState(null);

  // ----------------------------
  // PREFILL WHEN EDITING
  // ----------------------------
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || "",
        description:
          editingItem.description || "",
        category:
          editingItem.category || "",
        price: editingItem.price || "",
        isAvailable:
          editingItem.isAvailable ?? true,
        image: null,
      });

      if (editingItem.image?.url) {
        setPreview(
          `http://localhost:1337${editingItem.image.url}`
        );
      }
    } else {
      setFormData(initialState);
      setPreview(null);
    }
  }, [editingItem]);

  if (!isOpen) return null;

  // ----------------------------
  // INPUT CHANGE
  // ----------------------------
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ----------------------------
  // IMAGE CHANGE
  // ----------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  // ----------------------------
  // ADD / UPDATE MENU ITEM
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append(
        "data",
        JSON.stringify({
          name: formData.name,
          description:
            formData.description,
          category:
            formData.category,
          price: Number(
            formData.price
          ),
          isAvailable:
            formData.isAvailable,
        })
      );

      if (formData.image) {
        data.append(
          "files.image",
          formData.image
        );
      }

      // ------------------------
      // UPDATE
      // ------------------------
      if (editingItem) {
        await axios.put(
          `http://localhost:1337/api/menus/${editingItem.documentId}`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Menu item updated successfully!"
        );
      }

      // ------------------------
      // CREATE
      // ------------------------
      else {
        await axios.post(
          "http://localhost:1337/api/menus",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Menu item added successfully!"
        );
      }

      setFormData(initialState);
      setPreview(null);

      onClose();
    } catch (error) {
      console.error(
        "Operation failed:",
        error
      );

      alert(
        "Failed to save menu item"
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <div className="modal-header">
          <h2>
            {editingItem
              ? "Edit Menu Item"
              : "Add Menu Item"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          className="menu-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Dish Name"
            value={formData.name}
            onChange={handleChange}
            required
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
            required
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
            required
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
              name="isAvailable"
              checked={
                formData.isAvailable
              }
              onChange={handleChange}
            />
            Available
          </label>

          <button
            type="submit"
            className="save-btn"
          >
            {editingItem
              ? "Update Item"
              : "Save Item"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddMenuItemModal;