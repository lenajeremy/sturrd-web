import { createSlice } from "@reduxjs/toolkit";
import * as UserTypes from "@/types/user-types";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: UserTypes.ParentDetails | UserTypes.SchoolOwnerDetails | UserTypes.StudentDetails | UserTypes.TeacherDetails = {
    name: '',
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    emailVerified: new Date().toISOString(),
    userType: 'BASE_USER'
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