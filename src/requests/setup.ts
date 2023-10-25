import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { UserTypes } from '@prisma/client'
import { BASE_URL } from '@/lib/constants'


type AccountSetupFormBody = {
    firstName?: string,
    lastName?: string,
    userType: typeof UserTypes['PARENT' | 'SCHOOL_OWNER']
}

type SchoolSetupFormBody = {
    longName: string,
    shortName: string,
}

type AccountSetupResponse = {
    message: string,
    data: {
        id: string,
        name: string,
        firstName: string,
        lastName: string,
        email: string,
        emailVerified: string,
        userType: UserTypes,
        image: string | null
    },
    errors: Array<any>
}

type SchoolSetupResponse = {}

const accountSetupApi = createApi({
    reducerPath: 'accountsetupapi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: builder => ({
        setupAccountDetails: builder.mutation<AccountSetupResponse, AccountSetupFormBody>({
            query: (args) => {
                return {
                    url: '/auth/setup-account',
                    method: "POST",
                    body: args
                }
            }
        }),
        setupSchool: builder.mutation<SchoolSetupResponse, SchoolSetupFormBody>({
            query: (args) => {
                return {
                    url: "/school/setup",
                    method: "POST",
                    body: args
                }
            }
        })
    }
    )
})

export default accountSetupApi

export const {
    useSetupAccountDetailsMutation,
    useSetupSchoolMutation
} = accountSetupApi