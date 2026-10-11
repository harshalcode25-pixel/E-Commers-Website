import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Cookie from "js-cookie";

const addToCartThunk = createAsyncThunk("cart/addItem", async ({ productId, qty }, { rejectWithValue }) => {
    try {
        // Load product details from the backend before saving it in the cart.
        const { data } = await Axios.get(`/api/products/${productId}`);
        return {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: { cartItems: [], shipping: {}, payment: {} },
    reducers: {
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.product !== action.payload);
        },
        saveShipping(state, action) {
            state.shipping = action.payload;
        },
        savePayment(state, action) {
            state.payment = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(addToCartThunk.fulfilled, (state, action) => {
            const index = state.cartItems.findIndex(item => item.product === action.payload.product);
            if (index < 0) {
                // Add a product that is not already in the cart.
                state.cartItems.push(action.payload);
            } else {
                // Replace the existing item with its updated quantity.
                state.cartItems[index] = action.payload;
            }
        });
    }
});

const { removeFromCart: removeCartItem } = cartSlice.actions;
export const { saveShipping, savePayment } = cartSlice.actions;
// A thunk is a function dispatched to Redux. It can read state and send actions.
// Save cookies after updating Redux so the cart survives a page refresh.
export function removeFromCart(productId) {
    return function (dispatch, getState) {
        dispatch(removeCartItem(productId));
        const cartItems = getState().cart.cartItems;
        Cookie.set("cartItems", JSON.stringify(cartItems));
    };
}

export function addToCart(productId, qty) {
    return async function (dispatch, getState) {
        await dispatch(addToCartThunk({ productId, qty }));
        const cartItems = getState().cart.cartItems;
        Cookie.set("cartItems", JSON.stringify(cartItems));
    };
}

export const cartReducer = cartSlice.reducer;
