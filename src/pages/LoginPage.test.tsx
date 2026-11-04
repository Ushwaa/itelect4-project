import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginPage from "./LoginPage";
import { loginUser } from "../api/client";
import useAuthStore from "../store/authStore";

vi.mock("../api/client", () => ({ loginUser: vi.fn() }));

function renderLoginPage() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/submissions" element={<p>Submissions page</p>} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  useAuthStore.setState({ token: null, userName: null, userId: null });
  vi.mocked(loginUser).mockReset();
});

describe("LoginPage", () => {
  it("shows validation feedback and does not call the API for invalid credentials", async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.click(screen.getByRole("button", { name: "Log In" }));

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(loginUser).not.toHaveBeenCalled();
  });

  it("stores a successful session and navigates to submissions", async () => {
    const user = userEvent.setup();
    vi.mocked(loginUser).mockResolvedValue({
      token: "test-token",
      user: { id: "user-1", username: "jordan", email: "jordan@example.com" },
    });
    renderLoginPage();

    await user.type(screen.getByLabelText("Email"), "jordan@example.com");
    await user.type(screen.getByLabelText("Password"), "correct-password");
    await user.click(screen.getByRole("button", { name: "Log In" }));

    expect(await screen.findByText("Submissions page")).toBeInTheDocument();
    expect(useAuthStore.getState().token).toBe("test-token");
  });

  it("displays an API login error", async () => {
    const user = userEvent.setup();
    vi.mocked(loginUser).mockRejectedValue(new Error("Invalid email or password."));
    renderLoginPage();

    await user.type(screen.getByLabelText("Email"), "jordan@example.com");
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Log In" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Invalid email or password.");
  });
});
