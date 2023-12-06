import ProtectedRoute from '@/components/protected-route'
import * as React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    )
}