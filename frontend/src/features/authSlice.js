import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "./authService";
import thunk from "redux-thunk";

const user = JSON.parse(localStorage.getItem("user"))
const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const initialState = {
    user: user ? user : null,
    userInfo: userInfo ? userInfo : {},
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
}

export const register = createAsyncThunk(
    "sign-up",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    "login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    "logout",
    async () => {
        authService.logout()
    }
)

export const getUserInfo = createAsyncThunk(
    "account/profile",
    async (_, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().user.user.access
            return await authService.getUserInfo(accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.isError = false
            state.isSuccess = false
            state.message = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload
            })
    }
})

export const {reset} = authSlice.actions

export default authSlice.reducer