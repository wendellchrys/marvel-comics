import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./login-form";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

describe("LoginForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render login form with Google and GitHub buttons", () => {
        render(<LoginForm />);

        expect(screen.getByText("Entre em sua conta")).toBeInTheDocument();
        expect(screen.getByText("Login com Google")).toBeInTheDocument();
        expect(screen.getByText("Login com GitHub")).toBeInTheDocument();
    });

    it("must call `signIn` with the Google provider when clicking the Google button", async () => {
        render(<LoginForm />);

        const googleButton = screen.getByText("Login com Google");
        fireEvent.click(googleButton);

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/dashboard" });
        });
    });

    it("must call `signIn` with the GitHub provider when clicking the GitHub button", async () => {
        render(<LoginForm />);

        const githubButton = screen.getByText("Login com GitHub");
        fireEvent.click(githubButton);

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith("github", { callbackUrl: "/dashboard" });
        });
    });

    it("should display an error message if login fails", async () => {
        (signIn as jest.Mock).mockRejectedValueOnce(new Error("Erro ao autenticar"));

        render(<LoginForm />);

        const googleButton = screen.getByText("Login com Google");
        fireEvent.click(googleButton);

        await waitFor(() => {
            expect(screen.getByText(/não foi possível autenticar com google/i)).toBeInTheDocument();
        });
    });

    it("should not display an error message initially", () => {
        render(<LoginForm />);

        expect(screen.queryByText(/não foi possível autenticar/i)).not.toBeInTheDocument();
    });
});
