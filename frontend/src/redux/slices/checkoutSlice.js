import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk to create a checkout session
export const createCheckoutSession = createAsyncThunk(
  "checkout/createCheckoutSession",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        checkoutData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// fetch checkout by id
export const fetchCheckout = createAsyncThunk(
  "checkout/fetchCheckout",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Fixed: finalize checkout and create order
export const finalizeCheckout = createAsyncThunk(
  "checkout/finalizeCheckout",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {}, // empty body
        { withCredentials: true } // config object
      );
      return response.data; // this is the newly created order
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    order: null, // store finalized order
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create checkout
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch checkout
      .addCase(fetchCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(fetchCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // finalize checkout
      .addCase(finalizeCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finalizeCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // store order here
      })
      .addCase(finalizeCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
