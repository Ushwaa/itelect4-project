import {
  User,
  Course,
  Submission,
  Coordinate,
  Formatter,
  StringOrNumber,
  Status,
  StudentWithCourse,
  ApiResponse,
  UserUpdate,
  UserPreview,
  PublicUser,
  RoleCount,
  SubmissionStatus,
  Role,
} from "../types/index";

const studentName: string = "Ariana Santos";
const currentYear: number = 2026;
const isClassActive: boolean = true;
const optionalValue: null = null;
const notDefined: undefined = undefined;
// GT1 explicitly requires an isolated any example; application code remains type-safe.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyAnyValue: any = "isolated GT1 any example";

function greet(name: string, year: number): string {
  return `Hello ${name}, welcome to ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}

const unknownValue: unknown = 42;

function processUnknownValue(value: unknown): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  if (typeof value === "number") {
    return value.toString();
  }

  return "Unknown value type";
}

const user: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester",
};


const studentWithCourse: StudentWithCourse = {
  ...user,
  enrolledCourse: course,
  gpa: 3.9,
};

const formatter: Formatter = (value: number): string => `Score: ${value.toFixed(1)}`;
const coordinate: Coordinate = { x: 10, y: 20 };
const valueOrString: StringOrNumber = "100";
const enrollmentStatus: Status = "active";

function printValue(value: string | number): void {
  if (typeof value === "string") {
    console.log("String value:", value.toUpperCase());
  } else {
    console.log("Number value:", value.toFixed(2));
  }
}

const courseDate: Date = new Date("2026-01-15T09:00:00Z");

if (courseDate instanceof Date) {
  console.log("Course date is valid:", courseDate.toISOString());
}

logMessage(greet(studentName, currentYear));
logMessage(formatter(95));
console.log(processUnknownValue(unknownValue));
printValue(valueOrString);
printValue(123);

console.log({ isClassActive, optionalValue, notDefined, coordinate, enrollmentStatus, legacyAnyValue });

// -------------------------------
// Part 2: Generics, ApiResponse, Utility Types, Enums
// -------------------------------

// Generic functions
function getFirst<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[0] : undefined;
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const firstUser: User | undefined = getFirst<User>([studentWithCourse]);
const foundUser: User | undefined = getById<User>([user], 1);

console.log("firstUser:", firstUser);
console.log("foundUser:", foundUser);

// Generic interface usage
const userResponse: ApiResponse<User> = {
  success: true,
  data: user,
  message: "User fetched successfully",
};

const courseResponse: ApiResponse<Course[]> = {
  success: true,
  data: [course],
};

console.log("userResponse:", userResponse);
console.log("courseResponse:", courseResponse);

// Utility types examples
const updateUserExample: UserUpdate = { name: "Updated Name" };
const userPreviewExample: UserPreview = { id: user.id, name: user.name, role: user.role };
const publicUserExample: PublicUser = { id: user.id, name: user.name, role: user.role };
const roleCountExample: RoleCount = { student: 1, admin: 0, instructor: 0 };

console.log({ updateUserExample, userPreviewExample, publicUserExample, roleCountExample });

// ReturnType example
function makeSubmission(courseCode: string) {
  const newSubmission: Submission = {
    id: Math.floor(Math.random() * 100000),
    studentId: user.id,
    courseCode,
    repoUrl: "https://github.com/example/repo",
    submittedAt: new Date(),
  };

  return newSubmission;
}

type NewSubmission = ReturnType<typeof makeSubmission>;

const created: NewSubmission = makeSubmission(course.code);

console.log("created submission:", created);

// Enums usage
const statusExample: SubmissionStatus = SubmissionStatus.Graded;
const roleExample: Role = Role.Student;

console.log("statusExample:", statusExample);
console.log("roleExample:", roleExample);
