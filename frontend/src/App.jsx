import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import { Toaster } from "sonner";
import Home from "./pages/Home";

import Register from "./components/Layout/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import CartDetails from "./components/Cart/CartDetails";
import AdminLayout from "./components/Admin/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collections/all" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/my-cart" element={<CartDetails />} />
        </Route>
        <Route>
          {/* admin layout */}
          <Route path="/admin" element={<AdminLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
