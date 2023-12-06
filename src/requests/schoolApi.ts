import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "@/lib/constants";
import { ApiResponse } from "@/types";
import { School } from "@prisma/client";

const schoolApi = createApi({
    reducerPath: 'schoolApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (build) =>  ({
        getSchoolDetails: build.query<ApiResponse<Omit<School, 'ownerId'>>, string>({
            query: (args) => `/school/${args}/overview`
        })
    })
})

export default schoolApi
export const { 
    useGetSchoolDetailsQuery,
    useLazyGetSchoolDetailsQuery
} = schoolApi;