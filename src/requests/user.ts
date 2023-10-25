import { BASE_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/user`, prepareHeaders: (headers) => {
            return headers
        }
    }),
    endpoints(build) {
        return {
            loggedInUserDetails: build.query<any, unknown>({
                query: () => '/me'
            })
        }
    },
})

export default userApi
export const {
    useLoggedInUserDetailsQuery,
    useLazyLoggedInUserDetailsQuery
} = userApi