import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionContextValue } from "next-auth/react";
import { AppSessionType } from "@/types";


const AppSessionInitialState: AppSessionType = {
    data: null,
    status: 'loading'
}

const appSessionSlice = createSlice({
    name: "appSessionSlice",
    initialState: AppSessionInitialState,
    reducers: {
        updateAppSession(state, action: PayloadAction<AppSessionType>) {
            state = action.payload
            return state
        }
    }
})

export default appSessionSlice.reducer
export const { updateAppSession } = appSessionSlice.actions