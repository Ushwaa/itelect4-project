import React, { useCallback, useEffect, useRef, useState } from "react";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import UserForm from "./components/UserForm";
import Dashboard from "./components/Dashboard";
import useFetch from "./hooks/useFetch";
import usePrevious from "./hooks/usePrevious";
import useToggle from "./hooks/useToggle";
import type { User, Course, Submission } from "./types/index";
import { fetchCourses, fetchUsers, simulateApiFailure } from "./services/api";
import { useAppContext } from "./context/AppContext";

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

  const { dispatch, state } = useAppContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDetails, toggleDetails] = useToggle(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious<string>(searchTerm);

  const fetchUsersRequest = useCallback(async () => {
    if (simulateApiFailure()) {
      throw new Error("The user service is temporarily unavailable.");
    }

    return fetchUsers();
  }, []);

  const fetchCoursesRequest = useCallback(async () => {
    if (simulateApiFailure()) {
      throw new Error("The course service is temporarily unavailable.");
    }

    return fetchCourses();
  }, []);

  const userApiRequest = useFetch(fetchUsersRequest);
  const courseApiRequest = useFetch(fetchCoursesRequest);

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

  const handleRefreshData = async (): Promise<void> => {
    await userApiRequest.refetch();
    await courseApiRequest.refetch();
  };

  const handleSelectUser = (user: User): void => {
    setSelectedUser(user);
    dispatch({ type: "SET_SELECTED_USER", payload: user });
  };

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div>
      <h1>ITELECT4 GT2 Part 1</h1>
      <UserCard user={student} onSelect={handleSelectUser} />

      {selectedUser && <p>Selected: {selectedUser.name}</p>}
      {state.selectedUser && <p>Global selected user: {state.selectedUser.name}</p>}

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

      <section>
        <h2>Fetched Data</h2>
        <button type="button" onClick={(): void => { void handleRefreshData(); }}>
          Refresh Data
        </button>

        {userApiRequest.loading && <p>Loading users...</p>}
        {userApiRequest.error && <p>Error: {userApiRequest.error}</p>}
        {userApiRequest.data && userApiRequest.data.length > 0 && (
          <ul>
            {userApiRequest.data.slice(0, 5).map((userItem) => (
              <li key={userItem.id}>{userItem.name} - {userItem.email}</li>
            ))}
          </ul>
        )}

        {courseApiRequest.loading && <p>Loading courses...</p>}
        {courseApiRequest.error && <p>Error: {courseApiRequest.error}</p>}
        {courseApiRequest.data && courseApiRequest.data.length > 0 && (
          <ul>
            {courseApiRequest.data.slice(0, 5).map((courseItem) => (
              <li key={courseItem.id}>{courseItem.title}</li>
            ))}
          </ul>
        )}
      </section>

      <Dashboard />
      <UserForm />
    </div>
  );
};

export default App;
