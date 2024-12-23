import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ComicsPage from "./page";
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

describe("ComicsPage", () => {
    const mockFavorites = [
        { id: 1, title: "Comic 1", thumbnail: { path: "path1", extension: "jpg" } },
    ];

    const mockComics = {
        results: [
            { id: 2, title: "Comic 2", thumbnail: { path: "path2", extension: "jpg" } },
            { id: 3, title: "Comic 3", thumbnail: { path: "path3", extension: "jpg" } },
        ],
        total: 30,
    };

    beforeEach(() => {
        jest.clearAllMocks();

        (useFavoritesModal as jest.Mock).mockReturnValue({
            favorites: mockFavorites,
            toggleFavorite: jest.fn(),
        });

        (fetchComics as jest.Mock).mockResolvedValue(mockComics);
    });

    it("should render the home page with the search field and the list of comics", async () => {
        render(<ComicsPage />);

        expect(screen.getByPlaceholderText("Buscar Comics...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Comic 2")).toBeInTheDocument();
            expect(screen.getByText("Comic 3")).toBeInTheDocument();
        });
    });

    it("should change page when next page button is clicked", async () => {
        render(<ComicsPage />);

        await waitFor(() => {
            expect(screen.getByText("Comic 2")).toBeInTheDocument();
        });

        const nextPageButton = screen.getByTestId("pagination-next");
        fireEvent.click(nextPageButton);

        await waitFor(() => {
            expect(fetchComics).toHaveBeenCalledWith(
                expect.objectContaining({
                    limit: "15",
                    offset: "15",
                })
            );
        });
    });

    it("you must search for comics when typing in the search field", async () => {
        render(<ComicsPage />);

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

    it("You must favorite and unfavorite a comic by clicking the favorite button", async () => {
        const toggleFavoriteMock = jest.fn();
        (useFavoritesModal as jest.Mock).mockReturnValue({
            favorites: mockFavorites,
            toggleFavorite: toggleFavoriteMock,
        });

        render(<ComicsPage />);

        await waitFor(() => {
            expect(screen.getByText("Comic 2")).toBeInTheDocument();
        });

        const favoriteButton = screen.getAllByTestId("favorite-button")[0];
        fireEvent.click(favoriteButton);

        expect(toggleFavoriteMock).toHaveBeenCalledWith(mockComics.results[0]);
    });

});
