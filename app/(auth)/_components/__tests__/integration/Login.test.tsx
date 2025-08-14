import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/(auth)/_components/Login";
import { login } from "@/actions/authActions";
import * as nextNavigation from "next/navigation"; // <-- важно: импорт как namespace

jest.mock("@/actions/authActions", () => ({
  login: jest.fn(),
}));

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useRouter: jest.fn(),
  };
});

describe("Login integration", () => {
  it("logs in successfully and redirects to /me", async () => {
    const push = jest.fn();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({ push });

    (login as jest.Mock).mockResolvedValue({
      token: "mocked-token",
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password123",
      });
      expect(push).toHaveBeenCalledWith("/me");
    });
  });
});
