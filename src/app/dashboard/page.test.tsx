import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFavoritesModal } from "../context/FavoritesModalContext";

jest.mock("next-auth/react", () => ({
    useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("../context/FavoritesModalContext", () => ({
    useFavoritesModal: jest.fn(),
}));

describe("Dashboard", () => {
    const mockPush = jest.fn();
    const mockOpenModal = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useFavoritesModal as jest.Mock).mockReturnValue({ openModal: mockOpenModal });
    });

    it("should display a loading message while session is loading", () => {
        (useSession as jest.Mock).mockReturnValue({ data: null, status: "loading" });

        render(<Dashboard />);

        expect(screen.getByText("Carregando...")).toBeInTheDocument();
    });

    it("should redirect to home if unauthenticated", () => {
        (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

        render(<Dashboard />);

        expect(mockPush).toHaveBeenCalledWith("/");
    });

    it("should render the user name and email when authenticated", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { name: "Nome Sobrenome", email: "teste@emaildeteste.com" } },
            status: "authenticated",
        });

        render(<Dashboard />);

        expect(screen.getByText("Bem-vindo, Nome Sobrenome!")).toBeInTheDocument();
        expect(screen.getByText("Email: teste@emaildeteste.com")).toBeInTheDocument();
    });

    it("should allow navigation to the comics page when clicking the Comics card", async () => {
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { name: "Nome Sobrenome", email: "teste@emaildeteste.com" } },
            status: "authenticated",
        });

        render(<Dashboard />);

        const comicsCard = screen.getByText("Comics");
        fireEvent.click(comicsCard);

        expect(mockPush).not.toHaveBeenCalled(); // Não chamamos push no card de link (Link do Next.js trata a navegação)
    });

    it("should open the favorites modal when clicking the Favorites card", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { name: "Nome Sobrenome", email: "teste@emaildeteste.com" } },
            status: "authenticated",
        });

        render(<Dashboard />);

        const favoritesCard = screen.getByText("Favoritos");
        fireEvent.click(favoritesCard);

        expect(mockOpenModal).toHaveBeenCalled();
    });
});
