import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AiReviewPage from "./AiReview";
import { askAi } from "../api/client";

vi.mock("../api/client", () => ({ askAi: vi.fn() }));

const review = {
  summary: "A clear course project with a defined submission workflow.",
  strengths: ["The user roles are clear."],
  improvements: ["Describe how late submissions are handled."],
  nextSteps: ["Add validation for repository URLs."],
  readiness: "almost" as const,
};

function renderAiReviewPage() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <AiReviewPage />
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.mocked(askAi).mockReset();
});

describe("AiReviewPage", () => {
  it("validates short descriptions without sending an API request", async () => {
    const user = userEvent.setup();
    renderAiReviewPage();

    await user.type(screen.getByLabelText("Project description"), "Too short");
    await user.click(screen.getByRole("button", { name: "Review project" }));

    expect(await screen.findByText("Project description must be at least 20 characters long.")).toBeInTheDocument();
    expect(askAi).not.toHaveBeenCalled();
  });

  it("submits a valid description and renders the structured review", async () => {
    const user = userEvent.setup();
    vi.mocked(askAi).mockResolvedValue(review);
    renderAiReviewPage();

    await user.type(
      screen.getByLabelText("Project description"),
      "A course submission tracker with student and instructor workflows."
    );
    await user.click(screen.getByRole("button", { name: "Review project" }));

    expect(await screen.findByRole("heading", { name: "Review result" })).toBeInTheDocument();
    expect(screen.getByText(review.summary)).toBeInTheDocument();
    expect(screen.getByText("The user roles are clear.")).toBeInTheDocument();
    expect(screen.getByText("almost")).toBeInTheDocument();
    expect(vi.mocked(askAi).mock.calls[0]?.[0]).toBe(
      "A course submission tracker with student and instructor workflows."
    );
  });
});
