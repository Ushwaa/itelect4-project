import {
  User,
  Course,
  Submission,
  ID,
  Coordinate,
  Formatter,
  StringOrNumber,
  Status,
  StudentWithCourse,
} from "../types/index";

const studentName: string = "Ariana Santos";
const currentYear: number = 2026;
const isClassActive: boolean = true;
const optionalValue: null = null;
const notDefined: undefined = undefined;

function greet(name: string, year: number): string {
  return `Hello ${name}, welcome to ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}

let flexibleValue: any = "This can be anything";
flexibleValue = { status: "active" };

let unknownValue: unknown = 42;

function processUnknownValue(value: unknown): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  if (typeof value === "number") {
    return value.toString();
  }

  return "Unknown value type";
}

function throwError(message: string): never {
  throw new Error(message);
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

const submission: Submission = {
  id: 1001,
  studentId: user.id,
  courseCode: course.code,
  repoUrl: "https://github.com/username/itelect4",
  submittedAt: new Date(),
  score: 92,
};

const studentWithCourse: StudentWithCourse = {
  ...user,
  enrolledCourse: course,
  gpa: 3.9,
};

const studentId: ID = user.id;
const coordinate: Coordinate = { x: 12, y: 34 };
const formatter: Formatter = (value: number): string => `Score: ${value.toFixed(1)}`;
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

console.log({ isClassActive, optionalValue, notDefined, enrollmentStatus });
