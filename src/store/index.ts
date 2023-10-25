import { configureStore } from '@reduxjs/toolkit'
import { accountSetupApi } from "@/requests"
import { appSessionReducer, pageLoaderReducer } from './reducers'


const middlewares = [
    accountSetupApi.middleware
]

const store = configureStore({
    reducer: {
        [accountSetupApi.reducerPath]: accountSetupApi.reducer,
        pageLoader: pageLoaderReducer,
        appSession: appSessionReducer
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(middlewares)
    },
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch