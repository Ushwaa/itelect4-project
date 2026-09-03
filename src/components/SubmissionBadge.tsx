import type { ApiSubmission } from "../types/index";
import { SubmissionStatus } from "../types/index";

interface SubmissionBadgeProps {
  submission: ApiSubmission;
  children?: React.ReactNode;
  onGrade?: (submission: ApiSubmission) => void;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({
  submission,
  children,
  onGrade,
}) => {
  const handleGrade = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onGrade) {
      onGrade(submission);
    }
    console.log("Grading submission:", submission.id);
  };

  const getStatus = (score?: number): SubmissionStatus => {
    if (score === undefined) return SubmissionStatus.Pending;
    if (score >= 90) return SubmissionStatus.Graded;
    return SubmissionStatus.Submitted;
  };

  const status = getStatus(submission.score);

  return (
    <div className="m-4 rounded-lg border border-green-200 bg-green-50 p-5 shadow-sm dark:border-green-700 dark:bg-gray-800">
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Repository:</strong> {submission.repoUrl}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Score:</strong> {submission.score ?? "Not graded yet"}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Status:</strong> {status}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleString()}
      </p>
      {children}
      <button
        onClick={handleGrade}
        className="mt-3 rounded bg-purple-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
      >
        Grade Submission
      </button>
    </div>
  );
};

export default SubmissionBadge;