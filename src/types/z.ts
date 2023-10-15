import { z } from 'zod'
import { UserTypes } from '@prisma/client'
const VALUES = [UserTypes.PARENT, UserTypes.SCHOOL_OWNER] as const

export const schoolObject = z.object({
    longName: z.string(),
    shortName: z.string(),
    address: z.string(),
    city: z.string().optional(),
    state: z.string().optional()
})

export type SchoolObject = z.infer<typeof schoolObject>

export const setupAccountObject = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userType: z.enum(VALUES).optional()
})

export type SetupAccountObject = z.infer<typeof setupAccountObject>