import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Cookie from "js-cookie";
import { getErrorMessage } from "../utils.js";

const signinThunk = createAsyncThunk("user/signin", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await Axios.post("/api/users/signin", { email, password });
        Cookie.set("userInfo", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

const registerThunk = createAsyncThunk("user/register", async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const response = await Axios.post("/api/users/register", { name, email, password });
        Cookie.set("userInfo", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

// Each slice stores the status and result of one account request.
// pending starts loading; fulfilled receives data; rejected receives an error.
// Returning a new state object clears the previous request result.
const userSigninSlice = createSlice({
    name: "userSignin",
    initialState: {},
    reducers: {
        signout: state => {
            state.userInfo = null;
            Cookie.remove("userInfo");
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signinThunk.pending, (state, action) => {
                return {
                    loading: true,
                };
            })
            .addCase(signinThunk.fulfilled, (state, action) => {
                return {
                    loading: false,
                    userInfo: action.payload,
                };
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                return {
                    loading: false,
                    userInfo: action.payload,
                };
            })
            .addCase(signinThunk.rejected, (state, action) => {
                return {
                    loading: false,
                    error: action.payload,
                };
            });
    }
});

const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState: {},
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerThunk.pending, (state, action) => {
                return {
                    loading: true,
                };
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                return {
                    loading: false,
                    userInfo: action.payload,
                };
            })
            .addCase(registerThunk.rejected, (state, action) => {
                return {
                    loading: false,
                    error: action.payload,
                };
            });
    }
});

// These functions keep the simple arguments used by the form pages.
export function signin(email, password) {
    return signinThunk({ email, password });
}
export function register(name, email, password) {
    return registerThunk({ name, email, password });
}
export const { signout } = userSigninSlice.actions;
export const userSigninReducer = userSigninSlice.reducer;
export const userRegisterReducer = userRegisterSlice.reducer;

