import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update order delivery status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get total revenue (admin only)
export const getTotalRevenue = createAsyncThunk(
  "adminOrders/totalRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/revenue`,
        { withCredentials: true }
      );
      return response.data; // expected: { totalRevenue, paidOrdersCount }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const orderSummary = createAsyncThunk(
  "adminOrders/orderSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/summary`,
        { withCredentials: true }
      );
      return response.data; // expected: { totalOrders, totalSales }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// delete an order (admin only)
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    lastOrders: [],
    totalRevenue: 0,
    paidOrdersCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== Fetch all orders =====
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalSales = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== Update order status =====
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
      })

      // ===== Delete order =====
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })

      // ===== Total revenue =====
      .addCase(getTotalRevenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.totalRevenue = action.payload.totalRevenue;
        state.paidOrdersCount = action.payload.paidOrdersCount;
      })
      .addCase(getTotalRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ===== Order summary (last 3 orders + total count) =====
      .addCase(orderSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.totalOrders = action.payload.totalOrders;
        state.lastOrders = action.payload.lastOrders; // you may want to add lastOrders to initialState
      })
      .addCase(orderSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
