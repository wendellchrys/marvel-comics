'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bem-vindo, {session.user?.name}!</h1>
      <p className="text-muted-foreground">Email: {session.user?.email}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Sair
      </button>
    </div>
  );
}
