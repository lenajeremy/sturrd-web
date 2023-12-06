'use client'

import { SessionProvider } from "next-auth/react";
import { Provider as StoreProvider } from "react-redux";
import { CookiesProvider } from 'react-cookie'
import store from '@/store'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <CookiesProvider>
            <StoreProvider store={store}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </StoreProvider>
        </CookiesProvider>
    )
}

export default Providers