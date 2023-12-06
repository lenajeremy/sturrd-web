import { WebsiteHeader } from '@/components/pages/landing'
import * as React from 'react'

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <WebsiteHeader />
            {children}
        </div>
    )
}