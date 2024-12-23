'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFavoritesModal } from "../context/FavoritesModalContext";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { openModal } = useFavoritesModal();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {session.user?.name}!</h1>
      <p className="text-muted-foreground mb-6">Email: {session.user?.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card para Comics */}
        <Link href="/dashboard/comics">
          <div className="cursor-pointer p-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
            <h2 className="text-xl font-semibold">Comics</h2>
            <p>Explore e descubra novos quadrinhos.</p>
          </div>
        </Link>

        {/* Card para Favoritos */}
        <button onClick={openModal}>
          <div className="cursor-pointer p-6 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition">
            <h2 className="text-xl font-semibold">Favoritos</h2>
            <p>Veja seus quadrinhos favoritos salvos.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
