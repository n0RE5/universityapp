import { createSlice } from "@reduxjs/toolkit";
import { fetchInit, fetchMe } from "../actions/authActions";

interface AuthState {
    isAuth: boolean
    id: string
    groupId: string | null
    firstName: string
    lastName: string
    patronymic: string
    photoUrl: string
    isLoading: boolean
}

const initialState: AuthState = {
    isAuth: false,
    id: "",
    groupId: null,
    firstName: "",
    lastName: "",
    patronymic: "",
    photoUrl: "",
    isLoading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchInit.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchInit.fulfilled, (state) => {
                state.isLoading = false
                state.isAuth = true
            })
            .addCase(fetchInit.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchMe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.patronymic = action.payload.patronymic
                state.photoUrl = action.payload.photoUrl
                state.groupId = action.payload.groupId
            })
            .addCase(fetchMe.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export default authSlice.reducer