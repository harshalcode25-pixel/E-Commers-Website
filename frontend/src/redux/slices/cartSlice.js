import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import Cookie from "js-cookie";

// -------------------------------------------------------------
// 1. Initial State: Starting data for the cart
// -------------------------------------------------------------
const initialState = {
    cartItems: [],
    shipping: {},
    payment: {}
};

// -------------------------------------------------------------
// 2. Async Thunk: Fetch product details from the API and add to cart
// Note for beginners: createAsyncThunk takes one argument (payload).
// We pass an object: { productId, qty }
// -------------------------------------------------------------
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (arg, { rejectWithValue }) => {
        try {
            // Support passing either { productId, qty } or a plain productId
            const productId = typeof arg === "object" ? arg.productId : arg;
            const qty = typeof arg === "object" ? (arg.qty ?? 1) : 1;

            // Fetch the latest product info from the server
            const { data } = await Axios.get(`/api/products/${productId}`);

            // Return the item formatted for our cart state
            return {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: Number(qty)
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// -------------------------------------------------------------
// 3. Cart Slice: Handles cart actions and state updates
// -------------------------------------------------------------
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Remove an item from the cart
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.product !== productId);
            // Save updated cart to cookies so it survives a page refresh
            Cookie.set("cartItems", JSON.stringify(state.cartItems));
        },
        // Save shipping address
        saveShipping: (state, action) => {
            state.shipping = action.payload;
        },
        // Save payment method (e.g. PayPal, Stripe, etc.)
        savePayment: (state, action) => {
            state.payment = action.payload;
        }
    },
    // extraReducers handles the actions automatically dispatched by createAsyncThunk
    extraReducers: builder => {
        // When addToCart succeeds:
        builder.addCase(addToCart.fulfilled, (state, action) => {
            const newItem = action.payload;
            const existItem = state.cartItems.find(item => item.product === newItem.product);

            if (existItem) {
                // If item is already in cart, update its quantity
                state.cartItems = state.cartItems.map(item =>
                    item.product === existItem.product ? newItem : item
                );
            } else {
                // If item is not in cart yet, add it
                state.cartItems.push(newItem);
            }

            // Save updated cart to cookies
            Cookie.set("cartItems", JSON.stringify(state.cartItems));
        });
    }
});

// -------------------------------------------------------------
// 4. Export Actions and Reducer
// -------------------------------------------------------------
export const { removeFromCart, saveShipping, savePayment } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
