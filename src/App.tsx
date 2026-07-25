import React from "react";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import type { User, Course, Submission } from "./types/index";

const App: React.FC = () => {
  const student: User = {
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
    studentId: student.id,
    courseCode: course.code,
    repoUrl: "https://github.com/example/itelect4",
    submittedAt: new Date(),
    score: 95,
  };

  const handleSelectUser = (selectedUser: User): void => {
    console.log("Selected user:", selectedUser);
  };

  return (
    <div>
      <h1>ITELECT4 GT2 Part 1</h1>
      <UserCard user={student} onSelect={handleSelectUser} />
      <CourseCard course={course} />
      <SubmissionBadge submission={submission}>
        <p>On time!</p>
      </SubmissionBadge>
    </div>
  );
};

export default App;
