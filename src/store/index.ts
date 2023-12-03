import { configureStore } from '@reduxjs/toolkit'
import { accountSetupApi, userApi, schoolApi } from "@/requests"
import { userDetailsReducer } from "./reducers"


const middlewares = [
    accountSetupApi.middleware,
    userApi.middleware,
    schoolApi.middleware
]

const store = configureStore({
    reducer: {
        [accountSetupApi.reducerPath]: accountSetupApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [schoolApi.reducerPath]: schoolApi.reducer,
        user: userDetailsReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(middlewares)
    },
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch