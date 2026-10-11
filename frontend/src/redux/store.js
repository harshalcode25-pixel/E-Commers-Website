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

function readCookie(name) {
    try {
        const savedValue = Cookies.get(name);
        if (!savedValue) {
            return null;
        }
        return JSON.parse(savedValue);
    } catch {
        // Ignore cookies that do not contain valid JSON.
        return null;
    }
}

// Redux keeps the app state; cookies restore the cart and login after refresh.
const store = configureStore({
    reducer: {
        // These names match the state paths read by useSelector in the pages.
        cart: cartReducer,
        userSignin: userSigninReducer,
        userRegister: userRegisterReducer,
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productSave: productSaveReducer,
        productDelete: productDeleteReducer
    },
    preloadedState: {
        // Restore saved data before React first reads the store.
        cart: { cartItems: readCookie("cartItems") || [], shipping: {}, payment: {} },
        userSignin: { userInfo: readCookie("userInfo") }
    }
});

export default store;
