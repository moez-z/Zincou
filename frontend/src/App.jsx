import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { checkAuth, checkAutoLogout } from "./redux/slices/authSlice";
import { fetchCart } from "./redux/slices/cartSlice";

// pages & components
import UserLayout from "./components/Layout/UserLayout";
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
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProduct from "./components/Admin/EditProduct";
import OrderManagement from "./components/Admin/OrderManagement";
import Login from "./components/Layout/Login";
import EditProfile from "./pages/EditProfile";
import NewArrivals from "./components/Products/NewArrivals";
import AddProduct from "./components/Admin/AddProduct";
import OrderDetailsMan from "./components/Admin/OrderDetailsMan";

// 🔒 ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  const dispatch = useDispatch();
  const { isCheckingAuth, guestId, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Check auth from session cookie
    dispatch(checkAuth());
    // Check auto logout timer
    dispatch(checkAutoLogout());
  }, [dispatch]);

  useEffect(() => {
    // Fetch cart after auth check
    if (!isCheckingAuth) {
      dispatch(fetchCart({ guestId, userId: user?._id }));
    }
  }, [isCheckingAuth, dispatch, guestId, user?._id]);

  // Loading screen while checking auth
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* User layout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="collections/all" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="new-arrivals" element={<NewArrivals />} />
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="EditProfile" element={<EditProfile />} />
            <Route
              path="order-confirmation/:id"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-orders"
              element={
                <ProtectedRoute>
                  <MyOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route path="my-cart" element={<CartDetails />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Admin layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="order/:id" element={<OrderDetailsMan />} />
            <Route path="products/add-new" element={<AddProduct />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>

          {/* Catch all - redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function AppWithStore() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
