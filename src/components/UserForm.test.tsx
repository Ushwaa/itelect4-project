import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import UserForm from "./UserForm";

describe("UserForm", () => {
  it("shows validation errors and blocks an invalid submission", async () => {
    const user = userEvent.setup();
    render(<UserForm />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Name must be at least 2 characters long.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });

  it("submits valid user details and resets the fields", async () => {
    const user = userEvent.setup();
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    render(<UserForm />);

    await user.type(screen.getByLabelText("Name"), "Jordan Lee");
    await user.type(screen.getByLabelText("Email"), "jordan@example.com");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(log).toHaveBeenCalledWith("User saved:", {
      name: "Jordan Lee",
      email: "jordan@example.com",
    });
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    log.mockRestore();
  });
});
