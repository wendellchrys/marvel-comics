'use client';

import React from "react";
import { useFavoritesModal } from "@/app/context/FavoritesModalContext";

export const Sidebar = () => {
    const { openModal } = useFavoritesModal();

    return (
        <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-xl font-bold">Menu</h1>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <a
                            href="/dashboard/comics"
                            className="block px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Comics
                        </a>
                    </li>
                    <li>
                        <button
                            onClick={openModal}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Favoritos
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
