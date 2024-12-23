import React from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type ComicCardProps = {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
    isFavorited: boolean;
    toggleFavorite: () => void;
};

export const ComicCard = React.forwardRef<HTMLDivElement, ComicCardProps>(
    ({ id, title, thumbnail, isFavorited, toggleFavorite }, ref) => {
        return (
            <div
                ref={ref}
                id={`comic-${id}`}
                className="relative border rounded overflow-hidden shadow flex flex-col items-center"
            >
                <button
                    onClick={toggleFavorite}
                    className="absolute top-2 left-2 text-xl text-white hover:text-red-500"
                >
                    {isFavorited ? (
                        <AiFillHeart size={30} className="text-red-500" />
                    ) : (
                        <AiOutlineHeart size={30} className="text-gray-300" />
                    )}
                </button>
                <Image
                    width={270}
                    height={200}
                    src={`${thumbnail.path}/landscape_xlarge.${thumbnail.extension}`}
                    alt={title}
                    className="w-full h-60 object-cover"
                />
                <h2 className="text-lg font-bold mt-2">{title}</h2>
            </div>
        );
    }
);

ComicCard.displayName = "ComicCard";
