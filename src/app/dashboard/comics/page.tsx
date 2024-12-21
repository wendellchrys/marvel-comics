'use client';

import { useEffect, useState } from "react";
import { fetchComics } from "@/app/api/marvel/actions";
import Pagination, {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

type Comic = {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
};

export default function ComicsPage() {
    const [comics, setComics] = useState<Comic[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    const limit = 9;

    const loadComics = async () => {
        setIsLoading(true);
        try {
            const offset = (page - 1) * limit;
            const params: Record<string, string> = { limit: String(limit), offset: String(offset) };

            if (search.trim()) {
                params.titleStartsWith = search.trim();
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
    };

    useEffect(() => {
        loadComics();
    }, [page, search]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 3;

        if (totalPages <= maxVisiblePages * 2 + 1) {
            for (let i = 1; i <= totalPages; i++) {
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
        } else {
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
        }

        return items;
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar Comics..."
                    className="border p-2 w-full mb-4 rounded"
                />
            </div>

            {/* Comics List */}
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {comics.map((comic) => (
                        <div
                            key={comic.id}
                            className="border rounded overflow-hidden shadow p-4 flex flex-col items-center"
                        >
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.title}
                                className="w-full h-48 object-cover mb-2"
                            />
                            <h2 className="text-lg font-bold">{comic.title}</h2>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
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
}
