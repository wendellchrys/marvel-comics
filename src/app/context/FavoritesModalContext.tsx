'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Comic } from "@/app/types/comics";
import { ComicCard } from "@/components";

type FavoritesModalContextType = {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    favorites: Comic[];
    toggleFavorite: (comic: Comic) => void;
};

const FavoritesModalContext = createContext<FavoritesModalContextType | undefined>(undefined);

export const FavoritesModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favorites, setFavorites] = useState<Comic[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteComics") || "[]");
        setFavorites(storedFavorites);
    }, []);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const toggleFavorite = (comic: Comic) => {
        const isFavorite = favorites.some((fav) => fav.id === comic.id);
        const updatedFavorites = isFavorite
            ? favorites.filter((fav) => fav.id !== comic.id)
            : [...favorites, comic];
        setFavorites(updatedFavorites);
        localStorage.setItem("favoriteComics", JSON.stringify(updatedFavorites));
    };

    return (
        <FavoritesModalContext.Provider
            value={{ isModalOpen, openModal, closeModal, favorites, toggleFavorite }}
        >
            {children}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-11/12 max-w-3xl rounded shadow-lg p-6 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Favoritos</h2>
                            <button
                                className="text-red-500 font-bold"
                                onClick={closeModal}
                            >
                                Fechar
                            </button>
                        </div>
                        {favorites.length === 0 ? (
                            <p>Você ainda não possui favoritos.</p>
                        ) : (
                            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                                {favorites.map((comic) => (
                                    <ComicCard
                                        key={comic.id}
                                        id={comic.id}
                                        title={comic.title}
                                        thumbnail={comic.thumbnail}
                                        isFavorited={true}
                                        toggleFavorite={() => toggleFavorite(comic)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </FavoritesModalContext.Provider>
    );
};

export const useFavoritesModal = (): FavoritesModalContextType => {
    const context = useContext(FavoritesModalContext);
    if (!context) {
        throw new Error("useFavoritesModal must be used within a FavoritesModalProvider");
    }
    return context;
};
