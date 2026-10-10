import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Cookie from "js-cookie";
import { getErrorMessage } from "../utils.js";

const signinThunk = createAsyncThunk("user/signin", async ({ email, password }, { rejectWithValue }) => {
    try {
        const { data } = await Axios.post("/api/users/signin", { email, password });
        Cookie.set("userInfo", JSON.stringify(data));
        return data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

const registerThunk = createAsyncThunk("user/register", async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const { data } = await Axios.post("/api/users/register", { name, email, password });
        Cookie.set("userInfo", JSON.stringify(data));
        return data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

// Each slice stores the status and result of one account request.
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
            .addCase(signinThunk.pending, () => ({ loading: true }))
            .addCase(signinThunk.fulfilled, (_, action) => ({ loading: false, userInfo: action.payload }))
            .addCase(registerThunk.fulfilled, (_, action) => ({ loading: false, userInfo: action.payload }))
            .addCase(signinThunk.rejected, (_, action) => ({ loading: false, error: action.payload }));
    }
});

const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState: {},
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerThunk.pending, () => ({ loading: true }))
            .addCase(registerThunk.fulfilled, (_, action) => ({ loading: false, userInfo: action.payload }))
            .addCase(registerThunk.rejected, (_, action) => ({ loading: false, error: action.payload }));
    }
});

export const signin = (email, password) => signinThunk({ email, password });
export const register = (name, email, password) => registerThunk({ name, email, password });
export const { signout } = userSigninSlice.actions;
export const userSigninReducer = userSigninSlice.reducer;
export const userRegisterReducer = userRegisterSlice.reducer;

