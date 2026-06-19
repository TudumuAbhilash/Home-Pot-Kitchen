import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MenuManagement.css";
import AddMenuItemModal from "../components/AddMenuItemModal";

function MenuManagement() {
  const [showModal, setShowModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // -------------------------
  // FETCH MENU ITEMS
  // -------------------------
  const fetchMenuItems = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:1337/api/menus?populate=*"
      );

      console.log("STRAPI DATA:", response.data);

      setMenuItems(response.data.data || []);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // -------------------------
  // DELETE MENU ITEM
  // -------------------------
  const handleDelete = async (documentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:1337/api/menus/${documentId}`
      );

      alert("Menu item deleted successfully");

      fetchMenuItems();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Delete failed");
    }
  };

  // -------------------------
  // SEARCH FILTER
  // -------------------------
  const filteredItems = menuItems.filter((item) =>
    item.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // -------------------------
  // STATS
  // -------------------------
  const totalItems = menuItems.length;

  const availableItems = menuItems.filter(
    (item) => item.isAvailable
  ).length;

  const unavailableItems = menuItems.filter(
    (item) => !item.isAvailable
  ).length;

  const averagePrice =
    totalItems > 0
      ? Math.round(
          menuItems.reduce(
            (sum, item) => sum + Number(item.price),
            0
          ) / totalItems
        )
      : 0;

  // -------------------------
  // LOADING
  // -------------------------
  if (loading) {
    return (
      <div className="menu-management">
        <h2>Loading menu items...</h2>
      </div>
    );
  }

  return (
    <div className="menu-management">

      {/* HEADER */}
      <div className="menu-header">
        <h2>Menu Management</h2>

        <button
          className="add-item-btn"
          onClick={() => {
            setEditingItem(null);
            setShowModal(true);
          }}
        >
          + Add New Item
        </button>

        <AddMenuItemModal
          isOpen={showModal}
          editingItem={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
            fetchMenuItems();
          }}
        />
      </div>

      {/* STATS */}
      <div className="menu-stats">

        <div className="stat-card">
          <h3>{totalItems}</h3>
          <p>Total Items</p>
        </div>

        <div className="stat-card">
          <h3>{availableItems}</h3>
          <p>Available</p>
        </div>

        <div className="stat-card">
          <h3>{unavailableItems}</h3>
          <p>Out Of Stock</p>
        </div>

        <div className="stat-card">
          <h3>₹{averagePrice}</h3>
          <p>Average Price</p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search dishes..."
          className="search-input"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      {/* TABLE */}
      <div className="menu-table-wrapper">

        <table className="menu-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Dish Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="7">
                  No menu items found
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>
                    {item.image?.url ? (
                      <img
                        src={`http://localhost:1337${item.image.url}`}
                        alt={item.name}
                        className="food-thumbnail"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  <td>{item.name}</td>

                  <td>{item.category}</td>

                  <td>₹{item.price}</td>

                  <td>
                    <span
                      className={`menu-status ${
                        item.isAvailable
                          ? "available"
                          : "out-stock"
                      }`}
                    >
                      {item.isAvailable
                        ? "Available"
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingItem(item);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          item.documentId
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MenuManagement;