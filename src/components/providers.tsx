'use client'

import { SessionProvider } from "next-auth/react";
import ProtectedRoute from "@/components/protected-route";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </SessionProvider>
    )
}

export default Providers