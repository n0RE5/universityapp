import { createSlice } from "@reduxjs/toolkit";
import { fetchInit, fetchMe } from "../actions/authActions";

interface AuthState {
    isAuth: boolean
    id: string
    groupId: string | null
    firstName: string
    lastName: string
    middleName: string
    photoUrl: string
    isLoading: boolean
}

const initialState: AuthState = {
    isAuth: false,
    id: "",
    groupId: null,
    firstName: "",
    lastName: "",
    middleName: "",
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
                state.firstName = action.payload.first_name
                state.lastName = action.payload.last_name
                state.middleName = action.payload.middle_name
                state.photoUrl = action.payload.photo_url
                state.groupId = action.payload.group_id
            })
            .addCase(fetchMe.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export default authSlice.reducer