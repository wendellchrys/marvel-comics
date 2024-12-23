'use client';

import { useEffect, useState, useCallback, useRef } from "react";
import { fetchComics } from "@/app/api/marvel/actions";
import { ComicCard, Loading } from "@/components";
import { useFavoritesModal } from "@/app/context/FavoritesModalContext";

type Comic = {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
};

const ComicsPageInfiniteScroll = () => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const { favorites, toggleFavorite } = useFavoritesModal();
    const observer = useRef<IntersectionObserver | null>(null);

    const limit = 15;

    useEffect(() => {
        const handler = setTimeout(() => {
            if (search.trim().length === 0 || search.trim().length >= 3) {
                setPage(1);
                setComics([]);
                setHasMore(true);
                setDebouncedSearch(search);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [search]);

    const loadComics = useCallback(async () => {
        if (!hasMore) return;

        setIsLoading(true);
        try {
            const offset = (page - 1) * limit;
            const params: Record<string, string> = { limit: String(limit), offset: String(offset) };

            if (debouncedSearch.trim().length >= 3) {
                params.titleStartsWith = debouncedSearch.trim();
            }

            const data = await fetchComics(params);

            setComics((prevComics) => [...prevComics, ...data.results]);
            setHasMore(data.results.length === limit);
        } catch (error) {
            throw new Error("Erro ao carregar comics: " + error);
        } finally {
            setIsLoading(false);
        }
    }, [page, debouncedSearch, limit, hasMore]);

    useEffect(() => {
        loadComics();
    }, [page, debouncedSearch, loadComics]);

    const lastComicElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (isLoading) return;

            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar Comics..."
                className="border p-2 w-full mb-4 rounded"
            />

            <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
                {comics.map((comic, index) => (
                    <ComicCard
                        ref={index === comics.length - 1 ? lastComicElementRef : null}
                        key={`${comic.id}-${index}`}
                        id={comic.id}
                        title={comic.title}
                        thumbnail={comic.thumbnail}
                        isFavorited={favorites.some((fav) => fav.id === comic.id)}
                        toggleFavorite={() => toggleFavorite(comic)}
                    />
                ))}
            </div>



            {isLoading && <Loading />}
            {!hasMore && <p className="text-center">Você chegou ao final da lista.</p>}
        </div>
    );
};

export default ComicsPageInfiniteScroll;
