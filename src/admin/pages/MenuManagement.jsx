import { useState } from "react";
import "../styles/MenuManagement.css";
import AddMenuItemModal from "../components/AddMenuItemModal";

function MenuManagement() {
    const [showModal, setShowModal] =
  useState(false);
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Chicken Biryani",
      category: "Biryani",
      price: 299,
      status: "Available",
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      category: "Main Course",
      price: 249,
      status: "Available",
    },
    {
      id: 3,
      name: "Veg Fried Rice",
      category: "Rice",
      price: 199,
      status: "Out of Stock",
    },
  ]);

  return (
    <div className="menu-management">

      <div className="menu-header">
        <h2>Menu Management</h2>

        <button
           className="add-item-btn"
           onClick={() =>
           setShowModal(true)
        }
        >
           + Add New Item
        </button>
        <AddMenuItemModal
          isOpen={showModal}
          onClose={() =>
           setShowModal(false)
        }
        />
      </div>

      <div className="menu-table-wrapper">

        <table className="menu-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Dish Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>

            {menuItems.map((item) => (
              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>₹{item.price}</td>

                <td>
                  <span
                    className={`menu-status ${
                      item.status === "Available"
                        ? "available"
                        : "out-stock"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <button className="edit-btn">
                    Edit
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>
                </td>

                <td>
                  <img
                  src="https://images.unsplash.com/photo-1563379091339-03246963d29a"
                  alt=""
                  className="food-thumbnail"
                  />
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MenuManagement;