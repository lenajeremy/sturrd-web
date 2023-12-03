import { BASE_URL } from "@/lib/constants";
import { ApiResponse } from "@/types";
import { type UserTypes } from "@prisma/client";
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
            loggedInUserDetails: build.query<ApiResponse<{
                id: string,
                name: string,
                firstName: string,
                lastName: string,
                email: string,
                emailVerified: string,
                userType: UserTypes,
                image?: string,
                ownerId?: string,
                hasUpdatedSchool?: boolean,
                schoolId?: string,
                schoolName?: string
            }>, undefined>({
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