export {
  API_URL,
  fetchCourses,
  fetchCourseByCode,
  fetchSubmissions,
  createSubmission,
  fetchSubmissionById,
  gradeSubmission,
  deleteSubmission,
  registerUser,
  loginUser,
} from "../api/client";
export type { Course, ApiSubmission, NewSubmission } from "../types/index";
