import { configureStore } from '@reduxjs/toolkit'
import { accountSetupApi } from "@/requests"


const middlewares = [
    accountSetupApi.middleware
]

const store = configureStore({
    reducer: {
        [accountSetupApi.reducerPath]: accountSetupApi.reducer
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(middlewares)
    },
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch