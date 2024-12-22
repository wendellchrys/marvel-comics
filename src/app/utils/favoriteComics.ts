import { Comic } from "@/app/types/comics";

const FAVORITES_KEY = "favoriteComics";

export const toggleFavoriteComic = (comic: Comic) => {
    const favorites = getFavoriteComics();
    const isFavorite = favorites.some((fav) => fav.id === comic.id);

    if (isFavorite) {
        const updatedFavorites = favorites.filter((fav) => fav.id !== comic.id);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } else {
        favorites.push(comic);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
};

export const getFavoriteComics = (): Comic[] => {
    if (typeof window === "undefined") return []; 
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const isComicFavorited = (comicId: number): boolean => {
    const favorites = getFavoriteComics();
    return favorites.some((fav) => fav.id === comicId);
};
