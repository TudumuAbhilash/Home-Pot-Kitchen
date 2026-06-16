import { useState } from "react";
import "../styles/Customers.css";

function Customers() {
  const [search, setSearch] = useState("");

  const customers = [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      orders: 15,
      spend: "₹8,450",
      lastOrder: "2026-06-15",
    },
    {
      id: 2,
      name: "Priya Reddy",
      phone: "9876543211",
      orders: 9,
      spend: "₹5,200",
      lastOrder: "2026-06-14",
    },
    {
      id: 3,
      name: "Arjun Kumar",
      phone: "9876543212",
      orders: 22,
      spend: "₹12,300",
      lastOrder: "2026-06-16",
    },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="customers-page">

      <div className="customers-header">
        <h2>Customers</h2>

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="customers-table-wrapper">

        <table className="customers-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Total Orders</th>
              <th>Total Spend</th>
              <th>Last Order</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.map(
              (customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.orders}</td>
                  <td>{customer.spend}</td>
                  <td>{customer.lastOrder}</td>

                  <td>
                    <button className="view-btn">
                      View
                    </button>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Customers;