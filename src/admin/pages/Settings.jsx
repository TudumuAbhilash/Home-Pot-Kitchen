import "../styles/Settings.css";

function Settings() {
  return (
    <div className="settings-page">

      <h2 className="settings-title">
        Restaurant Settings
      </h2>

      <div className="settings-grid">

        {/* Restaurant Information */}

        <div className="settings-card">

          <h3>Restaurant Information</h3>

          <input
            type="text"
            placeholder="Restaurant Name"
            defaultValue="Home Pot Kitchen"
          />

          <input
            type="text"
            placeholder="Owner Name"
          />

          <textarea
            placeholder="Restaurant Description"
          />

        </div>

        {/* Contact Information */}

        <div className="settings-card">

          <h3>Contact Details</h3>

          <input
            type="text"
            placeholder="Phone Number"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="text"
            placeholder="Address"
          />

        </div>

        {/* Business Hours */}

        <div className="settings-card">

          <h3>Business Hours</h3>

          <input
            type="time"
          />

          <input
            type="time"
          />

        </div>

        {/* Delivery Settings */}

        <div className="settings-card">

          <h3>Delivery Settings</h3>

          <input
            type="number"
            placeholder="Delivery Charge"
          />

          <input
            type="number"
            placeholder="Minimum Order Amount"
          />

        </div>

        {/* GST Settings */}

        <div className="settings-card">

          <h3>Tax Settings</h3>

          <input
            type="text"
            placeholder="GST Number"
          />

          <input
            type="number"
            placeholder="Tax Percentage"
          />

        </div>

      </div>

      <button className="save-settings-btn">
        Save Settings
      </button>

    </div>
  );
}

export default Settings;