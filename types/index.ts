export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

export type ID = string | number;

export type Coordinate = {
  x: number;
  y: number;
};

export type Formatter = (value: number) => string;

export type StringOrNumber = string | number;

export type Status = "pending" | "active" | "inactive";

export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa: number;
};

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type UserUpdate = Partial<User>;

export type UserPreview = Pick<User, "id" | "name" | "role">;

export type PublicUser = Omit<User, "email" | "isActive">;

export type RoleCount = Record<"student" | "admin" | "instructor", number>;

export enum SubmissionStatus {
  Pending,
  Graded,
  Late,
  Submitted,
}

export const enum Role {
  Student = "student",
  Admin = "admin",
  Instructor = "instructor",
}

export type ApiSubmission = Omit<Submission, "id" | "submittedAt"> & {
  _id: string;
  submittedAt: string;
};

export type NewSubmission = Pick<ApiSubmission, "courseCode" | "repoUrl">;

export type GradeSubmission = {
  score: number;
};

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginCredentials {
  username: string;
}
