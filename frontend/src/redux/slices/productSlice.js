import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../utils.js";

export const listProducts = createAsyncThunk("products/list", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/products");
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

export const detailsProduct = createAsyncThunk("products/details", async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

export const saveProduct = createAsyncThunk("products/save", async (product, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const userInfo = state.userSignin.userInfo;
        const options = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        let response;
        if (product._id) {
            // Update an existing product.
            response = await axios.put(`/api/products/${product._id}`, product, options);
        } else {
            // Create a new product.
            response = await axios.post("/api/products", product, options);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

export const deleteProduct = createAsyncThunk("products/delete", async (productId, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const userInfo = state.userSignin.userInfo;
        const response = await axios.delete(`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

// createAsyncThunk sends three actions for each API request:
// pending = started, fulfilled = succeeded, rejected = failed.
// extraReducers handles these actions; action.payload contains data or an error.
// Returning an object replaces this slice state, clearing old request results.
const productListSlice = createSlice({
    name: "productList",
    initialState: { products: [] },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(listProducts.pending, (state, action) => {
                return {
                    loading: true,
                    products: [],
                };
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                return {
                    loading: false,
                    products: action.payload,
                };
            })
            .addCase(listProducts.rejected, (state, action) => {
                return {
                    loading: false,
                    error: action.payload,
                    products: [],
                };
            });
    }
});

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: { product: { reviews: [] } },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(detailsProduct.pending, (state, action) => {
                return {
                    loading: true,
                    product: { reviews: [] },
                };
            })
            .addCase(detailsProduct.fulfilled, (state, action) => {
                return {
                    loading: false,
                    product: action.payload,
                };
            })
            .addCase(detailsProduct.rejected, (state, action) => {
                return {
                    loading: false,
                    error: action.payload,
                    product: { reviews: [] },
                };
            });
    }
});

const productSaveSlice = createSlice({
    name: "productSave",
    initialState: { product: { reviews: [] } },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(saveProduct.pending, (state, action) => {
                return {
                    loading: true,
                };
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                return {
                    loading: false,
                    success: true,
                    product: action.payload,
                };
            })
            .addCase(saveProduct.rejected, (state, action) => {
                return {
                    loading: false,
                    error: action.payload,
                };
            });
    }
});

const productDeleteSlice = createSlice({
    name: "productDelete",
    initialState: { product: { reviews: [] } },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(deleteProduct.pending, (state, action) => {
                return {
                    loading: true,
                };
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                return {
                    loading: false,
                    success: true,
                    product: action.payload,
                };
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                return {
                    loading: false,
                    error: action.payload,
                };
            });
    }
});

export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const productSaveReducer = productSaveSlice.reducer;
export const productDeleteReducer = productDeleteSlice.reducer;

