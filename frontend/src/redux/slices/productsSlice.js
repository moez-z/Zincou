import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Search } from "lucide-react";

// Async thunk for fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    minPrice,
    maxPrice,
    gender,
    category,
    sortBy,
    search,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (gender) query.append("gender", gender);
    if (category) query.append("category", category);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

// Async thunk to fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );

    return response.data;
  }
);

// async thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${productData.id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (id) => {
    const productId = id.toString();
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${productId}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      collection: "",
      size: "",
      color: "",
      minPrice: "",
      maxPrice: "",
      gender: "",
      category: "",
      sortBy: "",
      search: "",
      limit: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        minPrice: "",
        maxPrice: "",
        gender: "",
        category: "",
        sortBy: "",
        search: "",
        limit: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // handle fetching products with filter
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // handle fetching single product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // handle updating product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updateProduct._id;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // handle fetching similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;

export default productsSlice.reducer;
