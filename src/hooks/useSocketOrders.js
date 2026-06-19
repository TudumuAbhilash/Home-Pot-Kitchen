import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export const useSocketOrders = () => {
  const [orderEvent, setOrderEvent] = useState(null);

  useEffect(() => {
    socket.on("order-created", (data) => {
      setOrderEvent({ type: "created", data });
    });

    socket.on("order-updated", (data) => {
      setOrderEvent({ type: "updated", data });
    });

    return () => socket.disconnect();
  }, []);

  return orderEvent;
};