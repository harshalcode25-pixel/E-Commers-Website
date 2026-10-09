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

const readCookie = name => {
    try {
        return JSON.parse(Cookies.get(name) || "null");
    } catch {
        return null;
    }
};

// Redux keeps the app state; cookies restore the cart and login after refresh.
const store = configureStore({
    reducer: {
        cart: cartReducer,
        userSignin: userSigninReducer,
        userRegister: userRegisterReducer,
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productSave: productSaveReducer,
        productDelete: productDeleteReducer
    },
    preloadedState: {
        cart: { cartItems: readCookie("cartItems") || [], shipping: {}, payment: {} },
        userSignin: { userInfo: readCookie("userInfo") }
    }
});

export default store;
