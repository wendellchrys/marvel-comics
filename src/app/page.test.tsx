import { render, screen } from "@testing-library/react";
import LoginPage from "./page";

jest.mock("@/components/login-form", () => ({
    LoginForm: jest.fn(() => <div data-testid="login-form">Login Page</div>),
}));

describe("LoginPage", () => {
    it("should render the login page with the LoginForm component", () => {
        render(<LoginPage />);

        expect(screen.getByTestId("login-page")).toBeInTheDocument();
        expect(screen.getByTestId("login-form")).toBeInTheDocument();
    });

    it("should have the correct layout", () => {
        render(<LoginPage />);

        const container = screen.getByTestId("login-page");
        expect(container).toHaveClass(
            "flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10"
        );

        const formWrapper = screen.getByTestId("login-form").parentElement;
        expect(formWrapper).toHaveClass("w-full max-w-sm md:max-w-3xl");
    });
});
