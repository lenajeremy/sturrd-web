import NextAuth from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { type UserTypes } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: AdapterUser & {
        userType: UserTypes
    }
  }
}