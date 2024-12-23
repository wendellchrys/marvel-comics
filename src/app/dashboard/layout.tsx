'use client';

import { ReactNode, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loading, Sidebar } from "@/components";
import { FavoritesModalProvider } from "@/app/context/FavoritesModalContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <Loading />;
    }

    if (!session) {
        return null;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <FavoritesModalProvider>
            <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div
                    className={`flex-1 flex flex-col transition-all duration-300`}
                >
                    <header className="flex h-16 items-center justify-between px-4 my-2">
                        <div className="flex items-center justify-center md:justify-start w-full">
                            <h1 className="text-lg font-bold">Dashboard</h1>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Sair
                        </button>
                    </header>
                    <main className="flex-1 p-4 border-t overflow-y-auto">{children}</main>
                </div>
            </div>
        </FavoritesModalProvider>
    );
}
