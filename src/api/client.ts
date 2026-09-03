import type { User, Course, ApiSubmission, NewSubmission } from "../types/index";

export const API_URL = "http://localhost:3001";

export function simulateApiFailure(): boolean {
  return Math.random() < 0.1;
}

function throwIfSimulatedFailure(): void {
  if (simulateApiFailure()) {
    throw new Error("The request failed temporarily. Please try again.");
  }
}

export async function fetchUsers(): Promise<User[]> {
  throwIfSimulatedFailure();
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) {
    throw new Error("Could not load users");
  }
  return res.json();
}

// GET /courses -> the whole list
export async function fetchCourses(): Promise<Course[]> {
  throwIfSimulatedFailure();
  const res = await fetch(`${API_URL}/courses`);
  if (!res.ok) {
    throw new Error("Could not load courses");
  }
  return res.json();
}

// GET /courses?code=ITELECT4 -> an ARRAY of matches, not one course
export async function fetchCourseByCode(code: string): Promise<Course> {
  throwIfSimulatedFailure();
  const res = await fetch(`${API_URL}/courses?code=${code}`);
  if (!res.ok) {
    throw new Error("Could not load that course");
  }
  const matches: Course[] = await res.json();
  if (matches.length === 0) {
    throw new Error(`No course found with code "${code}".`);
  }
  return matches[0];
}

// GET /submissions
export async function fetchSubmissions(): Promise<ApiSubmission[]> {
  throwIfSimulatedFailure();
  const res = await fetch(`${API_URL}/submissions`);
  if (!res.ok) {
    throw new Error("Could not load submissions");
  }
  return res.json();
}

// POST /submissions -> the row the server saved, with the id it made
export async function createSubmission(
  newSubmission: NewSubmission
): Promise<ApiSubmission> {
  throwIfSimulatedFailure();
  const res = await fetch(`${API_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSubmission),
  });
  if (!res.ok) {
    throw new Error("Could not save the submission");
  }
  return res.json();
}