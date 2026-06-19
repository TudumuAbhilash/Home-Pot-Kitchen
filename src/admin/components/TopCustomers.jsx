function TopCustomers({ customers = [] }) {
  return (
    <div className="chart-card">
      <h3>🏆 Top Customers</h3>

      {customers.length === 0 ? (
        <p>No customer data available</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Orders</th>
              <th>Spent</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.orders}</td>
                <td>₹{customer.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TopCustomers;