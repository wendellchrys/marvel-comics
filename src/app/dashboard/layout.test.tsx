import { render, screen, fireEvent } from "@testing-library/react";
import DashboardLayout from "./layout";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/app/context/FavoritesModalContext", () => ({
    FavoritesModalProvider: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}));

jest.mock("@/components/Sidebar", () => ({
    Sidebar: ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => (
        <div>
            <button onClick={toggleSidebar}>{isOpen ? "Close Sidebar" : "Open Sidebar"}</button>
        </div>
    ),
}));

describe("DashboardLayout", () => {
    const useRouterMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: useRouterMock });

    it("should display a loading spinner while session is loading", () => {
        (useSession as jest.Mock).mockReturnValue({ data: null, status: "loading" });

        render(
            <DashboardLayout>
                <p>Test Content</p>
            </DashboardLayout>
        );

        expect(screen.getByText("Carregando...")).toBeInTheDocument();
    });

    it("should redirect to home if unauthenticated", () => {
        (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

        render(
            <DashboardLayout>
                <p>Test Content</p>
            </DashboardLayout>
        );

        expect(useRouterMock).toHaveBeenCalledWith("/");
    });

    it("should render the dashboard layout when authenticated", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { name: "Test User", email: "test@example.com" } },
            status: "authenticated",
        });

        render(
            <DashboardLayout>
                <p>Test Content</p>
            </DashboardLayout>
        );

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should allow toggling the sidebar", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { name: "Test User", email: "test@example.com" } },
            status: "authenticated",
        });

        render(
            <DashboardLayout>
                <p>Test Content</p>
            </DashboardLayout>
        );

        const toggleButton = screen.getByText("Close Sidebar");
        expect(toggleButton).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(screen.getByText("Open Sidebar")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Open Sidebar"));
        expect(screen.getByText("Close Sidebar")).toBeInTheDocument();
    });

    it("should call signOut when logout button is clicked", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { name: "Test User", email: "test@example.com" } },
            status: "authenticated",
        });

        render(
            <DashboardLayout>
                <p>Test Content</p>
            </DashboardLayout>
        );

        const logoutButton = screen.getByText("Sair");
        fireEvent.click(logoutButton);

        expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
    });
});
