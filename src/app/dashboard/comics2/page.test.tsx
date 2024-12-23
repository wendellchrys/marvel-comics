import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ComicsPageInfiniteScroll from "./page";
import { useFavoritesModal } from "@/app/context/FavoritesModalContext";
import { fetchComics } from "@/app/api/marvel/actions";

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

jest.mock("@/app/context/FavoritesModalContext", () => ({
    useFavoritesModal: jest.fn(),
}));

jest.mock("@/app/api/marvel/actions", () => ({
    fetchComics: jest.fn(),
}));

describe("ComicsPageInfiniteScroll", () => {
    const mockFavorites = [{ id: 1, title: "Favorite Comic", thumbnail: { path: "path1", extension: "jpg" } }];
    const mockComicsPage1 = {
        results: [
            { id: 2, title: "Comic 1", thumbnail: { path: "path2", extension: "jpg" } },
            { id: 3, title: "Comic 2", thumbnail: { path: "path3", extension: "jpg" } },
        ],
    };
    const mockComicsPage2 = {
        results: [
            { id: 4, title: "Comic 3", thumbnail: { path: "path4", extension: "jpg" } },
            { id: 5, title: "Comic 4", thumbnail: { path: "path5", extension: "jpg" } },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useFavoritesModal as jest.Mock).mockReturnValue({
            favorites: mockFavorites,
            toggleFavorite: jest.fn(),
        });
        (fetchComics as jest.Mock)
            .mockResolvedValueOnce(mockComicsPage1)
            .mockResolvedValueOnce(mockComicsPage2);
    });

    it("should render the initial comics and load more when scrolling", async () => {
        render(<ComicsPageInfiniteScroll />);

        expect(screen.getByPlaceholderText("Buscar Comics...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Comic 1")).toBeInTheDocument();
            expect(screen.getByText("Comic 2")).toBeInTheDocument();
        });

        const lastComic = screen.getByText("Comic 2");
        fireEvent.scroll(lastComic);

        await waitFor(() => {
            expect(screen.getByText("Comic 3")).toBeInTheDocument();
            expect(screen.getByText("Comic 4")).toBeInTheDocument();
        });
    });

    it("you must search for comics when typing in the search field", async () => {
        render(<ComicsPageInfiniteScroll />);

        const searchInput = screen.getByPlaceholderText("Buscar Comics...");
        fireEvent.change(searchInput, { target: { value: "Spider" } });

        await waitFor(() => {
            expect(fetchComics).toHaveBeenCalledWith(
                expect.objectContaining({
                    titleStartsWith: "Spider",
                })
            );
        });
    });

    it("should display message when reaching the end of the list", async () => {
        (fetchComics as jest.Mock)
            .mockResolvedValueOnce(mockComicsPage1)
            .mockResolvedValueOnce({ results: [] });

        render(<ComicsPageInfiniteScroll />);

        await waitFor(() => {
            expect(screen.getByText("Comic 1")).toBeInTheDocument();
        });

        const lastComic = screen.getByText("Comic 2");
        fireEvent.scroll(lastComic);

        await waitFor(() => {
            expect(screen.getByText("Você chegou ao final da lista.")).toBeInTheDocument();
        });
    });
});
