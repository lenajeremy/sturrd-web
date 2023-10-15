'use client'

import { SessionProvider } from "next-auth/react";
import ProtectedRoute from "@/components/protected-route";
import { Provider as StoreProvider } from "react-redux";
import store from '@/store'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreProvider store={store}>
            <SessionProvider>
                <ProtectedRoute>
                    {children}
                </ProtectedRoute>
            </SessionProvider>
        </StoreProvider>
    )
}

export default Providers