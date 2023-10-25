import { configureStore } from '@reduxjs/toolkit'
import { accountSetupApi, userApi } from "@/requests"
import { userDetailsReducer } from "./reducers"


const middlewares = [
    accountSetupApi.middleware,
    userApi.middleware
]

const store = configureStore({
    reducer: {
        [accountSetupApi.reducerPath]: accountSetupApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        user: userDetailsReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(middlewares)
    },
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch