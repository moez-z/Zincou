import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/** Helper: Load guest cart from localStorage */
const loadGuestCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("myApp_cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

/** Helper: Save guest cart to localStorage */
const saveGuestCartToLocalStorage = (cart) => {
  localStorage.setItem("myApp_cart", JSON.stringify(cart));
};

/** Fetch cart for user or guest */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cards`,
        {
          params: { userId, guestId },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/** Add item to cart */
export const addToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (
    { userId, guestId, productId, quantity, size, color },
    { rejectWithValue }
  ) => {
    try {
      const payload = { userId, guestId, productId, quantity };
      if (size) payload.size = size;
      if (color) payload.color = color;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cards`,
        payload,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/** Update quantity of cart item */
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { userId, guestId, productId, quantity, size, color },
    { rejectWithValue }
  ) => {
    try {
      const payload = { userId, guestId, productId, quantity };
      if (size) payload.size = size;
      if (color) payload.color = color;

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cards`,
        payload,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/** Remove item from cart */
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const payload = { productId, guestId, userId };
      if (size) payload.size = size;
      if (color) payload.color = color;

      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cards`,
        {
          data: payload,
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/** Merge guest and user carts */
export const mergeCarts = createAsyncThunk(
  "cart/mergeCarts",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cards/merge`,
        { userId, guestId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    selectedCart: loadGuestCartFromLocalStorage(), // Keep guest cart local
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.selectedCart = { products: [] };
      saveGuestCartToLocalStorage(state.selectedCart);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })

      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCart = action.payload;
        saveGuestCartToLocalStorage(state.selectedCart);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add to cart";
      })

      // updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCart = action.payload.cart || action.payload;
        saveGuestCartToLocalStorage(state.selectedCart);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart item";
      })

      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCart = action.payload;
        saveGuestCartToLocalStorage(state.selectedCart);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove item";
      })

      // mergeCarts
      .addCase(mergeCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCart = action.payload;
        saveGuestCartToLocalStorage(state.selectedCart);
      })
      .addCase(mergeCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to merge carts";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
