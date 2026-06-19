import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:1337/api";

export const useLiveOrders = (interval = 3000) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders?populate=*`);
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Live fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();

    const timer = setInterval(() => {
      fetchOrders();
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { orders, refresh: fetchOrders };
};