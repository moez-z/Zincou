import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mergeCarts } from "../slices/cartSlice";

// ✅ REMOVED: clearAuthData function (no longer needed)
// ✅ REMOVED: userFromStorage (no longer reading from localStorage)

// Check for existing guest ID or generate a new one
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Timer reference (not in Redux store)
let logoutTimer = null;

// ✅ UPDATED: Initial state - user starts as null, will be fetched from server
const initialState = {
  user: null,
  isAuthenticated: false,
  guestId: initialGuestId,
  loading: false,
  error: null,
  isCheckingAuth: true, // New: Track if we're checking authentication
};

// ✅ NEW: Check if user is authenticated (called on app load)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
        { withCredentials: true } // ✅ Send cookies
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  }
);

// ✅ UPDATED: login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData,
        { withCredentials: true } // ✅ Enable cookies
      );

      const { user } = response.data;
      // ✅ REMOVED: localStorage operations for token and userInfo
      // Cookie is automatically stored by browser

      // Set logout time 2 hours from now (for auto-logout timer)
      const logoutTime = Date.now() + 2 * 60 * 60 * 1000;
      localStorage.setItem("logoutTime", logoutTime.toString());
      dispatch(startAutoLogout(2 * 60 * 60 * 1000)); // 2 hours in ms

      // Merge guest cart into user cart
      const { guestId } = getState().auth;
      if (guestId) {
        await dispatch(mergeCarts({ userId: user._id, guestId }));
      }

      return user;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Invalid email or password";
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ UPDATED: register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData,
        { withCredentials: true } // ✅ Enable cookies
      );

      const { user } = response.data;
      // ✅ REMOVED: localStorage operations for token and userInfo

      const logoutTime = Date.now() + 2 * 60 * 60 * 1000;
      localStorage.setItem("logoutTime", logoutTime.toString());
      dispatch(startAutoLogout(2 * 60 * 60 * 1000));

      // Merge guest cart into user cart
      const { guestId } = getState().auth;
      if (guestId) {
        await dispatch(mergeCarts({ userId: user._id, guestId }));
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ NEW: logout user (calls backend to clear cookie)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.guestId = `guest_${new Date().getTime()}`;

      // ✅ REMOVED: clearAuthData() - only remove logoutTime
      localStorage.removeItem("logoutTime");
      localStorage.setItem("guestId", state.guestId);

      if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
      }
    },

    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },

    startAutoLogout: (_, action) => {
      const timeout = action.payload;

      if (logoutTimer) clearTimeout(logoutTimer);

      logoutTimer = setTimeout(() => {
        window.location.reload(); // optional: refresh page
        localStorage.removeItem("logoutTime");
      }, timeout);
    },

    checkAutoLogout: (state) => {
      const logoutTime = localStorage.getItem("logoutTime");
      if (logoutTime && Date.now() > Number(logoutTime)) {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("logoutTime");
        if (logoutTimer) clearTimeout(logoutTimer);
      } else if (logoutTime) {
        const remainingTime = Number(logoutTime) - Date.now();
        if (remainingTime > 0) {
          logoutTimer = setTimeout(() => {
            localStorage.removeItem("logoutTime");
            window.location.reload();
          }, remainingTime);
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // ✅ NEW: checkAuth cases
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // ✅ NEW: logoutUser cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.guestId = `guest_${new Date().getTime()}`;
        localStorage.removeItem("logoutTime");
        localStorage.setItem("guestId", state.guestId);
        if (logoutTimer) {
          clearTimeout(logoutTimer);
          logoutTimer = null;
        }
      });
  },
});

export const { logout, generateNewGuestId, startAutoLogout, checkAutoLogout } =
  authSlice.actions;

export default authSlice.reducer;
