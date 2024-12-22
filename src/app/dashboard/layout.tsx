'use client';

import { ReactNode, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components";
import { FavoritesModalProvider } from "@/app/context/FavoritesModalContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Carregando sessão...</p>;
    }

    if (!session) {
        return null;
    }

    return (
        <FavoritesModalProvider>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <header className="flex h-16 items-center justify-between border-b px-4">
                        <h1 className="text-lg font-bold">Dashboard</h1>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Sair
                        </button>
                    </header>
                    <main className="flex-1 p-4">{children}</main>
                </div>
            </div>
        </FavoritesModalProvider>
    );
}
