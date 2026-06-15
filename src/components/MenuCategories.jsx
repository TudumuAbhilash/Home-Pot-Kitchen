import "../styles/MenuCategories.css";

function MenuCategories() {
  return (
    <section className="menu-categories">

      <button className="active">
        🍛 Biryani
      </button>

      <button>
        🥘 Meals
      </button>

      <button>
        🍜 Curries
      </button>

      <button>
        🍞 Breads
      </button>

      <button>
        🥤 Beverages
      </button>

      <button>
        🍨 Desserts
      </button>

    </section>
  );
}

export default MenuCategories;