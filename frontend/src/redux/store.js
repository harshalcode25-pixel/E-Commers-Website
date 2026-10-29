import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
    productListReducer,
    productDetailsReducer,
    productSaveReducer,
    productDeleteReducer
} from "./slices/productSlice.js";
import { userSigninReducer, userRegisterReducer } from "./slices/userSlice.js";
import { cartReducer } from "./slices/cartSlice.js";

// Helper function: Safely read saved JSON data from browser cookies
function readCookie(name) {
    try {
        const savedValue = Cookies.get(name);
        if (!savedValue) {
            return null;
        }
        return JSON.parse(savedValue);
    } catch {
        return null;
    }
}

// ============================================================================
// Redux Store Configuration
// configureStore automatically combines reducers and sets up Redux Thunk
// ============================================================================
const store = configureStore({
    // Combine all slice reducers into a single state tree
    reducer: {
        cart: cartReducer,
        userSignin: userSigninReducer,
        userRegister: userRegisterReducer,
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productSave: productSaveReducer,
        productDelete: productDeleteReducer
    },
    // Initial data restored from cookies when the user first opens the page
    preloadedState: {
        cart: {
            cartItems: readCookie("cartItems") || [],
            shipping: {},
            payment: {}
        },
        userSignin: {
            userInfo: readCookie("userInfo") || null
        }
    }
});

export default store;
