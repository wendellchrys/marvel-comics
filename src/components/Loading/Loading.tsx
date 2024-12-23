'use client';

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <AiOutlineLoading3Quarters
                className="animate-spin text-gray-700"
                size={40}
                role="status"
                aria-label="Carregando"
            />
            <p className="text-gray-500 mt-2 text-sm">Carregando...</p>
        </div>
    );
};
