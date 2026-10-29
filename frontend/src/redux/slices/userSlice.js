import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Cookie from "js-cookie";
import { getErrorMessage } from "../utils.js";

// ============================================================================
// 1. ASYNC THUNKS (API Calls for Login and Registration)
// Beginners Note: When calling async thunks with multiple values,
// pass them inside an object (e.g. { email, password }).
// ============================================================================

// Sign in an existing user
export const signin = createAsyncThunk(
    "user/signin",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await Axios.post("/api/users/signin", { email, password });
            // Save user info to cookies so user stays logged in after page refresh
            Cookie.set("userInfo", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// Register a new user
export const register = createAsyncThunk(
    "user/register",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const response = await Axios.post("/api/users/register", { name, email, password });
            // Save user info to cookies
            Cookie.set("userInfo", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// ============================================================================
// 2. SLICES (State Management)
// ============================================================================

// Slice 1: User Signin
const userSigninSlice = createSlice({
    name: "userSignin",
    initialState: {
        userInfo: null,
        loading: false,
        error: null
    },
    reducers: {
        // Logout action: clear user info from Redux and cookies
        signout: state => {
            state.userInfo = null;
            Cookie.remove("userInfo");
        }
    },
    extraReducers: builder => {
        builder
            // When signin request starts
            .addCase(signin.pending, state => {
                state.loading = true;
                state.error = null;
            })
            // When signin request succeeds
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            // When signin request fails
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // If the user registers, automatically log them in
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            });
    }
});

// Slice 2: User Register
const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState: {
        userInfo: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            // When register request starts
            .addCase(register.pending, state => {
                state.loading = true;
                state.error = null;
            })
            // When register request succeeds
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            // When register request fails
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// ============================================================================
// 3. EXPORTS
// ============================================================================
export const { signout } = userSigninSlice.actions;
export const userSigninReducer = userSigninSlice.reducer;
export const userRegisterReducer = userRegisterSlice.reducer;
