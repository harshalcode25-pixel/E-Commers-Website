import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../utils.js";

export const listProducts = createAsyncThunk("products/list", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/api/products");
        return data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

export const detailsProduct = createAsyncThunk("products/details", async (productId, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        return data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

export const saveProduct = createAsyncThunk("products/save", async (product, { getState, rejectWithValue }) => {
    try {
        const { userSignin: { userInfo } } = getState();
        const options = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = product._id
            ? await axios.put(`/api/products/${product._id}`, product, options)
            : await axios.post("/api/products", product, options);
        return data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

export const deleteProduct = createAsyncThunk("products/delete", async (productId, { getState, rejectWithValue }) => {
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete(`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        return data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

// These reducers update Redux when each product request starts, succeeds, or fails.
const productListSlice = createSlice({
    name: "productList",
    initialState: { products: [] },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(listProducts.pending, () => ({ loading: true, products: [] }))
            .addCase(listProducts.fulfilled, (_, action) => ({ loading: false, products: action.payload }))
            .addCase(listProducts.rejected, (_, action) => ({ loading: false, error: action.payload, products: [] }));
    }
});

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: { product: { reviews: [] } },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(detailsProduct.pending, () => ({ loading: true, product: { reviews: [] } }))
            .addCase(detailsProduct.fulfilled, (_, action) => ({ loading: false, product: action.payload }))
            .addCase(detailsProduct.rejected, (_, action) => ({ loading: false, error: action.payload, product: { reviews: [] } }));
    }
});

const productSaveSlice = createSlice({
    name: "productSave",
    initialState: { product: { reviews: [] } },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(saveProduct.pending, () => ({ loading: true }))
            .addCase(saveProduct.fulfilled, (_, action) => ({ loading: false, success: true, product: action.payload }))
            .addCase(saveProduct.rejected, (_, action) => ({ loading: false, error: action.payload }));
    }
});

const productDeleteSlice = createSlice({
    name: "productDelete",
    initialState: { product: { reviews: [] } },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(deleteProduct.pending, () => ({ loading: true }))
            .addCase(deleteProduct.fulfilled, (_, action) => ({ loading: false, success: true, product: action.payload }))
            .addCase(deleteProduct.rejected, (_, action) => ({ loading: false, error: action.payload }));
    }
});

export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const productSaveReducer = productSaveSlice.reducer;
export const productDeleteReducer = productDeleteSlice.reducer;

