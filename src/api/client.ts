import type {
  ApiSubmission,
  AuthResponse,
  Course,
  GradeSubmission,
  LoginCredentials,
  NewSubmission,
  RegisterPayload,
} from "../types/index";
import useAuthStore from "../store/authStore";

export const API_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "") ?? "";

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  authenticated?: boolean;
}

function parseResponse(text: string): unknown {
  if (!text) return undefined;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === "string" && payload.trim()) return payload;

  if (typeof payload === "object" && payload !== null && "message" in payload) {
    const message = payload.message;
    if (typeof message === "string" && message.trim()) return message;
  }

  return fallback;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not set. Add it to the frontend .env file and restart Vite.");
  }

  const token = options.authenticated ? useAuthStore.getState().token : null;
  if (options.authenticated && !token) {
    throw new Error("Please log in to continue.");
  }

  const headers = new Headers({ Accept: "application/json" });
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    method: options.method ?? "GET",
    headers,
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  });

  const payload = parseResponse(await response.text());
  if (!response.ok) {
    if (response.status === 401 && options.authenticated) {
      useAuthStore.getState().logout();
    }
    throw new Error(getErrorMessage(payload, `Request failed (${response.status}).`));
  }

  return payload as T;
}

export function fetchCourses(): Promise<Course[]> {
  return request<Course[]>("/api/courses");
}

export function fetchCourseByCode(code: string): Promise<Course> {
  return request<Course>(`/api/courses/${encodeURIComponent(code)}`);
}

export function fetchSubmissions(): Promise<ApiSubmission[]> {
  return request<ApiSubmission[]>("/api/submissions", { authenticated: true });
}

export function fetchSubmissionById(id: string): Promise<ApiSubmission> {
  return request<ApiSubmission>(`/api/submissions/${encodeURIComponent(id)}`, {
    authenticated: true,
  });
}

export function createSubmission(newSubmission: NewSubmission): Promise<ApiSubmission> {
  return request<ApiSubmission>("/api/submissions", {
    method: "POST",
    body: newSubmission,
    authenticated: true,
  });
}

export function gradeSubmission(id: string, grade: GradeSubmission): Promise<ApiSubmission> {
  return request<ApiSubmission>(`/api/submissions/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: grade,
    authenticated: true,
  });
}

export function deleteSubmission(id: string): Promise<void> {
  return request<void>(`/api/submissions/${encodeURIComponent(id)}`, {
    method: "DELETE",
    authenticated: true,
  });
}

export function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/register", { method: "POST", body: payload });
}

export function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", { method: "POST", body: credentials });
}