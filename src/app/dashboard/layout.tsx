'use client';

import { ReactNode, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/"); // Redireciona para a página inicial se o usuário não estiver autenticado
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Carregando sessão...</p>;
    }

    if (!session) {
        return null; // Ou uma mensagem de erro, dependendo do fluxo desejado
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Page</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Bem-vindo, {session.user?.name}!</h1>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Sair
                        </button>
                    </div>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
