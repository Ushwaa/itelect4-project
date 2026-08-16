import React, { useEffect, useRef, useState } from "react";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import type { User, Course, Submission } from "./types/index";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

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

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDetails, toggleDetails] = useToggle(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious<string>(searchTerm);

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect((): void => {
    setTimeout((): void => {
      setCourses([course]);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredCourses: Course[] = courses.filter((courseItem: Course): boolean =>
    courseItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div>
      <h1>ITELECT4 GT2 Part 1</h1>
      <UserCard user={student} onSelect={setSelectedUser} />

      {selectedUser && <p>Selected: {selectedUser.name}</p>}

      <div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={focusSearch}>Focus Search</button>
      </div>

      <button type="button" onClick={toggleDetails}>
        {showDetails ? "Hide" : "Show"} Details
      </button>

      {showDetails && <p>Course details are visible.</p>}

      {previousSearch && <p>Previous search: {previousSearch}</p>}

      {filteredCourses.map((courseItem: Course) => (
        <CourseCard key={courseItem.code} course={courseItem} />
      ))}

      <SubmissionBadge submission={submission}>
        <p>On time!</p>
      </SubmissionBadge>
    </div>
  );
};

export default App;
