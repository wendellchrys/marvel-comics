'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFavoritesModal } from "../context/FavoritesModalContext";
import { Loading } from "@/components";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { openModal } = useFavoritesModal();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {session.user?.name}!</h1>
      <p className="text-muted-foreground mb-6">Email: {session.user?.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/comics">
          <div className="cursor-pointer p-6 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-900 transition">
            <h2 className="text-xl font-semibold">Comics com Paginação</h2>
            <p>Explore e descubra novos quadrinhos.</p>
          </div>
        </Link>

        <Link href="/dashboard/comics2">
          <div className="cursor-pointer p-6 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-800 transition">
            <h2 className="text-xl font-semibold">Comics com Scroll</h2>
            <p>Explore e descubra novos quadrinhos.</p>
          </div>
        </Link>

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
