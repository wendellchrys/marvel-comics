'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Comic } from "@/app/types/comics";
import { ComicCard } from "@/components";
import { Modal } from "@/components";

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
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Favoritos">
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
            </Modal>
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
