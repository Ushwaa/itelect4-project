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
}

export const enum Role {
  Student = "student",
  Admin = "admin",
  Instructor = "instructor",
}
