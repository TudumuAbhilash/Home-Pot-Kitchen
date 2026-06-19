import { useEffect, useState, useRef } from "react";

function DeliveryMap() {
  const [position, setPosition] = useState({
    lat: 17.385,
    lng: 78.486,
  });

  const [status, setStatus] = useState("Preparing");
  const [distance, setDistance] = useState(0);

  const intervalRef = useRef(null);

  // 🎯 SIMULATED DELIVERY SPEED (meters approx)
  const speed = 0.00015;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPosition((prev) => {
        const newPos = {
          lat: prev.lat + speed,
          lng: prev.lng + speed,
        };

        // fake distance calculation
        setDistance((d) => d + 12);

        return newPos;
      });
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // 🎯 AUTO STATUS CHANGE SIMULATION
  useEffect(() => {
    if (distance > 50 && distance <= 120) {
      setStatus("Out for Delivery");
    } else if (distance > 120) {
      setStatus("Delivered");
      clearInterval(intervalRef.current);
    }
  }, [distance]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚚 Live Delivery Tracking</h1>

      {/* STATUS CARD */}
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Status: {status}</h2>
        <p>Distance Covered: {distance} m</p>
      </div>

      {/* LOCATION */}
      <div
        style={{
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <h3>📍 Driver Location</h3>
        <p>Latitude: {position.lat.toFixed(6)}</p>
        <p>Longitude: {position.lng.toFixed(6)}</p>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ marginTop: "20px" }}>
        <h3>📦 Delivery Progress</h3>

        <div
          style={{
            height: "10px",
            background: "#ddd",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width:
                status === "Preparing"
                  ? "20%"
                  : status === "Out for Delivery"
                  ? "70%"
                  : "100%",
              background: "green",
              transition: "0.5s",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DeliveryMap;