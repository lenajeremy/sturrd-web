import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

const pageLoaderSlice = createSlice({
    name: 'pageLoaderSlice',
    initialState,
    reducers: {
        showLoader: (state) => {
            state = true;
            return state
        },
        hideLoader: (state) => {
            state = false;
            return state;
        },
        toggleLoader: (state) => {
            state = !state;
            return state
        }
    }
})


export default pageLoaderSlice.reducer
export const { showLoader, hideLoader, toggleLoader } = pageLoaderSlice.actions