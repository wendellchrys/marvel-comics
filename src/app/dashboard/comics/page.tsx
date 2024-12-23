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
import { ComicCard, Loading } from "@/components";
import { useFavoritesModal } from "@/app/context/FavoritesModalContext";

type Comic = {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
};

const ComicsPage = () => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    const { favorites, toggleFavorite } = useFavoritesModal();

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

    const renderPaginationItems = () => {
        const maxVisiblePages = 2;
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
                <Loading />
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
        </div>
    );
};

export default ComicsPage;
