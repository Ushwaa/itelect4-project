import React from "react";
import type { Submission } from "../types/index";

interface SubmissionBadgeProps {
  submission: Submission;
  children?: React.ReactNode;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({ submission, children }) => {
  return (
    <section>
      <p>Repository: {submission.repoUrl}</p>
      <p>Score: {submission.score ?? "Not graded yet"}</p>
      {children}
    </section>
  );
};

export default SubmissionBadge;
