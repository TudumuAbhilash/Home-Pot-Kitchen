import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderSuccess from "./pages/OrderSuccess";

import AdminLayout from "./admin/layouts/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";

import Orders from "./admin/pages/Orders";
import MenuManagement from "./admin/pages/MenuManagement";
import Customers from "./admin/pages/Customers";
import Analytics from "./admin/pages/Analytics";
import Settings from "./admin/pages/Settings";
import { Toaster } from "react-hot-toast";

import Login from "./admin/pages/Login";
import ProtectedRoute from "./admin/components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
               <ProtectedRoute>
                 <AdminLayout />
               </ProtectedRoute>
               }
               >
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="customers" element={<Customers />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;