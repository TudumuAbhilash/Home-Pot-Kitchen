import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MenuGrid.css";
import { useCart } from "../context/CartContext";

function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState("Biryani");
  const { addToCart } = useCart();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM STRAPI
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1337/api/menus?populate=*"
      );

      // IMPORTANT: Strapi v5 sometimes returns flat structure OR nested
      const data = res.data?.data || [];

      setMenuItems(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching menu:", error);
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading menu...</h2>;

  // SAFE CATEGORY FILTER
  const filteredItems = menuItems.filter((item) => {
    const category = item?.category || item?.attributes?.category;

    return (
      category &&
      category.toLowerCase().trim() ===
        activeCategory.toLowerCase().trim()
    );
  });

  return (
    <section className="menu-grid-section">

      {/* FILTER BUTTONS */}
      <div className="menu-filter">

        <button
          className={activeCategory === "Biryani" ? "active" : ""}
          onClick={() => setActiveCategory("Biryani")}
        >
          🍛 Biryani
        </button>

        <button
          className={activeCategory === "Meals" ? "active" : ""}
          onClick={() => setActiveCategory("Meals")}
        >
          🥘 Meals
        </button>

        <button
          className={activeCategory === "Main Course" ? "active" : ""}
          onClick={() => setActiveCategory("Main Course")}
        >
          🍽️ Main Course
        </button>

      </div>

      {/* MENU GRID */}
      <div className="menu-grid">

        {filteredItems.length === 0 ? (
          <p>No items found in this category</p>
        ) : (
          filteredItems.map((item) => {

            // SUPPORT BOTH STRAPI V4 AND V5
            const data = item?.attributes || item;

            if (!data) return null;

            return (
              <div className="menu-card" key={item.id}>

                {/* IMAGE */}
                <div className="menu-image">
                  <img
                    src={
                      data.image?.data?.attributes?.url
                        ? `http://localhost:1337${data.image.data.attributes.url}`
                        : data.image?.url
                        ? `http://localhost:1337${data.image.url}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={data.name || "menu item"}
                  />
                </div>

                {/* CONTENT */}
                <div className="menu-content">

                  <h3>{data.name}</h3>

                  <p className="menu-desc">
                    {data.description}
                  </p>

                  <div className="menu-rating">
                    ⭐ 4.5
                  </div>

                  <div className="menu-bottom">

                    <span>₹{data.price}</span>

                   <button
  onClick={() =>
    addToCart({
      id: item.id,
      name: data.name,
      price: Number(data.price),
      image:
        data.image?.data?.attributes?.url
          ? `http://localhost:1337${data.image.data.attributes.url}`
          : data.image?.url
          ? `http://localhost:1337${data.image.url}`
          : "",
    })
  }
>
  Add To Cart
</button>

                  </div>

                </div>

              </div>
            );
          })
        )}

      </div>

    </section>
  );
}

export default MenuGrid;