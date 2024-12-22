'use client';

import { useEffect, useState, useCallback } from "react";
import { fetchComics } from "@/app/api/marvel/actions";
import Pagination, {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import { ComicCard } from "@/components";
import { useFavoritesModal } from "@/app/context/FavoritesModalContext";

type Comic = {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
};

const ComicsPage = () => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [favorites, setFavorites] = useState<Comic[]>([]);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    const { isModalOpen, closeModal } = useFavoritesModal();

    const limit = 15;

    useEffect(() => {
        const handler = setTimeout(() => {
            if (search.trim().length === 0 || search.trim().length >= 3) {
                setPage(1);
                setDebouncedSearch(search);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteComics") || "[]");
        setFavorites(storedFavorites);
    }, []);

    const loadComics = useCallback(async () => {
        setIsLoading(true);
        try {
            const offset = (page - 1) * limit;
            const params: Record<string, string> = { limit: String(limit), offset: String(offset) };

            if (debouncedSearch.trim().length >= 3) {
                params.titleStartsWith = debouncedSearch.trim();
            }

            const data = await fetchComics(params);

            setComics(data.results);
            setTotalPages(Math.ceil(data.total / limit));
        } catch (error) {
            console.error("Erro ao carregar comics:", error);
            setComics([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [page, debouncedSearch, limit]);

    useEffect(() => {
        loadComics();
    }, [page, debouncedSearch, loadComics]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const toggleFavorite = (comic: Comic) => {
        const isFavorite = favorites.some((fav) => fav.id === comic.id);
        const updatedFavorites = isFavorite
            ? favorites.filter((fav) => fav.id !== comic.id)
            : [...favorites, comic];
        setFavorites(updatedFavorites);
        localStorage.setItem("favoriteComics", JSON.stringify(updatedFavorites));
    };

    const renderPaginationItems = () => {
        const maxVisiblePages = 3;
        const items = [];

        if (page > maxVisiblePages + 1) {
            items.push(
                <PaginationItem key="start-ellipsis">
                    <PaginationLink isDisabled>...</PaginationLink>
                </PaginationItem>
            );
        }

        for (
            let i = Math.max(1, page - maxVisiblePages);
            i <= Math.min(totalPages, page + maxVisiblePages);
            i++
        ) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={i === page}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (page < totalPages - maxVisiblePages) {
            items.push(
                <PaginationItem key="end-ellipsis">
                    <PaginationLink isDisabled>...</PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar Comics..."
                className="border p-2 w-full mb-4 rounded"
            />

            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
                    {comics.map((comic) => (
                        <ComicCard
                            key={comic.id}
                            id={comic.id}
                            title={comic.title}
                            thumbnail={comic.thumbnail}
                            isFavorited={favorites.some((fav) => fav.id === comic.id)}
                            toggleFavorite={() => toggleFavorite(comic)}
                        />
                    ))}
                </div>
            )}

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationPrevious
                        isDisabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    />
                    {renderPaginationItems()}
                    <PaginationNext
                        isDisabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                    />
                </PaginationContent>
            </Pagination>

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
        </div>
    );
};

export default ComicsPage;
