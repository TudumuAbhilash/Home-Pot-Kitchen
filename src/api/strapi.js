import axios from "axios";

const API_URL = "http://localhost:1337";


// -------------------- MENU --------------------
export const getMenuItems = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/menus?populate=*`
    );

    return res.data;
  } catch (error) {
    console.log("Error fetching menu:", error);
    return null;
  }
};


// -------------------- ORDERS --------------------
export const createOrder = async (orderData, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/orders`,
      {
        data: orderData,
      },
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error creating order:", error);
    throw error;
  }
};


// -------------------- LOGIN --------------------
export const loginAdmin = async (
  email,
  password
) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/auth/local`,
      {
        identifier: email,
        password,
      }
    );

    return res.data;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};


export const getOrders = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `${API_URL}/api/orders?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(
      "Error fetching orders:",
      error
    );
    return null;
  }
};


export const updateOrderStatus = async (id, status) => {
  try {
    const res = await axios.put(`${API_URL}/api/orders/${id}`, {
      data: {
        orderStatus: status,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Update order error:", error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/api/orders/${id}`);
    return res.data;
  } catch (error) {
    console.log("Delete order error:", error);
    throw error;
  }
};