'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

type FavoritesModalContextType = {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const FavoritesModalContext = createContext<FavoritesModalContextType | undefined>(undefined);

export const FavoritesModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        console.log("Abrindo modal de favoritos.");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("Fechando modal de favoritos.");
        setIsModalOpen(false);
    };

    return (
        <FavoritesModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
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
