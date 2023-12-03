import { ReactNode } from "react";
import { Header, Sidebar } from "@/components/shared";


function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative">
            <Sidebar />
            <main className='lg:ml-[300px]'>
                <Header />
                <div className = 'p-4'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AppLayout