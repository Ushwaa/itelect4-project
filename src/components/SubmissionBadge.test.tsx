import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SubmissionBadge from "./SubmissionBadge";
import type { ApiSubmission } from "../types/index";

const submission: ApiSubmission = {
  _id: "submission-1",
  courseCode: "ITELECT4",
  repoUrl: "https://github.com/example/project",
  submittedAt: "2026-11-04T10:00:00.000Z",
};

describe("SubmissionBadge", () => {
  it("shows the ungraded state and passes the submission to the grade action", async () => {
    const user = userEvent.setup();
    const onGrade = vi.fn();
    render(<SubmissionBadge submission={submission} onGrade={onGrade} />);

    expect(screen.getByText("Not graded yet")).toBeInTheDocument();
    expect(screen.getByText(submission.repoUrl)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Grade Submission" }));
    expect(onGrade).toHaveBeenCalledWith(submission);
  });

  it("shows a score and the graded status for a high score", () => {
    render(<SubmissionBadge submission={{ ...submission, score: 95 }} />);

    expect(screen.getByText("95")).toBeInTheDocument();
    expect(screen.getByText(/Status:/).parentElement).toHaveTextContent("1");
  });
});
