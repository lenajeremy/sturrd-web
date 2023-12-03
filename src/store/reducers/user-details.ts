import { createSlice } from "@reduxjs/toolkit";
import * as UserTypes from "@/types/user-types";
import { PayloadAction } from "@reduxjs/toolkit";


// for now, I'm restricting this to just school owners
const initialState: UserTypes.SchoolOwnerDetails = {
    name: '',
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    emailVerified: new Date().toISOString(),
    userType: "SCHOOL_OWNER",
    schoolName: "",
    schoolId: "",
    hasUpdatedSchool: false
}

type NotRequired<T> = {
    [Property in keyof T]?: T[Property]
}

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        updateUserDetails(state, action: PayloadAction<NotRequired<typeof initialState>>) {
            state = { ...state, ...action.payload }
            return state
        },
    }
})

export default userDetailsSlice.reducer
export const { updateUserDetails } = userDetailsSlice.actions