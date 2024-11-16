import { createAsyncThunk } from "@reduxjs/toolkit";
import MigaikService from "../../api/services/MigaikService";
import { RootState } from "../store";
import { IGetMe } from "../../types/migaik";

export const fetchInit = createAsyncThunk<{token: string}, {initData: string}, {state: RootState}>(
    'auth/fetchInit',
    async(data: {initData: string}, { rejectWithValue }) => {
        try {
            const response = await MigaikService.init(data.initData)
            localStorage.setItem('token', response.data.token)
            return response.data
        } catch(e) {
            console.log(e)
            return rejectWithValue('error')
        }
    }
)

export const fetchMe = createAsyncThunk<IGetMe, void, {state: RootState}>(
    'auth/fetchMe',
    async(_, { rejectWithValue }) => {
        try {
            const response = await MigaikService.getMe()
            return response.data
        } catch(e) {
            console.log(e)
            return rejectWithValue('error')
        }
    }
)