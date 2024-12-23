'use client';

import React from "react";
import { useFavoritesModal } from "@/app/context/FavoritesModalContext";

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const { openModal } = useFavoritesModal();

    return (
        <>
            <button
                onClick={toggleSidebar}
                data-testid="menu-button"
                className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded"
            >
                Menu
            </button>

            {isOpen && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSidebar();
                    }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    role="presentation"
                    data-testid="overlay"
                ></div>
            )}

            {isOpen && (
                <aside
                    data-testid="sidebar"
                    className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                        } transition-transform duration-300 md:translate-x-0 md:relative md:h-screen`}
                >
                    <div className="p-4 border-b border-gray-700">
                        <h1 className="text-xl font-bold" data-testid="menu-header">
                            Menu
                        </h1>
                    </div>
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/dashboard"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard/comics"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Comics Paginação
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard/comics2"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Comics Scroll Infinito
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={openModal}
                                    data-testid="favoritos-button"
                                    className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Favoritos
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>
            )}
        </>
    );
};
