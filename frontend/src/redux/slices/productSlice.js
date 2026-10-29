import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../utils.js";

// ============================================================================
// 1. ASYNC THUNKS (API Calls)
// ============================================================================

// Fetch all products from the backend
export const listProducts = createAsyncThunk(
    "products/list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/products");
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// Fetch a single product's details by ID
export const detailsProduct = createAsyncThunk(
    "products/details",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// Create a new product or update an existing one (Admin)
export const saveProduct = createAsyncThunk(
    "products/save",
    async (product, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const userInfo = state.userSignin.userInfo;
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };

            let response;
            if (product._id) {
                // If product already has an ID, update it
                response = await axios.put(`/api/products/${product._id}`, product, config);
            } else {
                // If no ID, create a brand new product
                response = await axios.post("/api/products", product, config);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// Delete a product by ID (Admin)
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (productId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const userInfo = state.userSignin.userInfo;
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };

            const response = await axios.delete(`/api/products/${productId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// ============================================================================
// 2. SLICES (State Management)
// Beginners Note: Each async thunk has 3 lifecycle states:
// - pending: The request has started (loading = true)
// - fulfilled: The request succeeded (loading = false, save data)
// - rejected: The request failed (loading = false, save error)
// ============================================================================

// Slice 1: Product List
const productListSlice = createSlice({
    name: "productList",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(listProducts.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Slice 2: Product Details
const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: { reviews: [] },
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(detailsProduct.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(detailsProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(detailsProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Slice 3: Product Save (Create / Update)
const productSaveSlice = createSlice({
    name: "productSave",
    initialState: {
        product: {},
        loading: false,
        success: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(saveProduct.pending, state => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.product = action.payload;
            })
            .addCase(saveProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Slice 4: Product Delete
const productDeleteSlice = createSlice({
    name: "productDelete",
    initialState: {
        product: {},
        loading: false,
        success: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(deleteProduct.pending, state => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.product = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// ============================================================================
// 3. EXPORTS
// ============================================================================
export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const productSaveReducer = productSaveSlice.reducer;
export const productDeleteReducer = productDeleteSlice.reducer;
