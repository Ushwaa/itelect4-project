import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import ProtectedRoute from "./ProtectedRoute";
import useAuthStore from "../store/authStore";

function renderProtectedPage() {
  return render(
    <MemoryRouter initialEntries={["/private"]}>
      <Routes>
        <Route path="/login" element={<p>Login page</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/private" element={<p>Private content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  useAuthStore.setState({ token: null, userName: null, userId: null });
});

describe("ProtectedRoute", () => {
  it("redirects an unauthenticated user to login", async () => {
    renderProtectedPage();

    expect(await screen.findByText("Login page")).toBeInTheDocument();
    expect(screen.queryByText("Private content")).not.toBeInTheDocument();
  });

  it("renders protected content when a token exists", () => {
    useAuthStore.setState({ token: "test-token", userName: "Jordan", userId: "user-1" });
    renderProtectedPage();

    expect(screen.getByText("Private content")).toBeInTheDocument();
  });
});
