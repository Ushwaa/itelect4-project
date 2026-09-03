import type { Course } from "../types/index";
import useUiStore from "../store/uiStore";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact";
  onEnroll?: (course: Course) => void;
}

function CourseCard({ course, variant = "default", onEnroll }: CourseCardProps) {
  const isCompact = variant === "compact";
  const isEnrolled = useUiStore((state) => state.enrolledCourseCodes.includes(course.code));
  const enrollInCourse = useUiStore((state) => state.enrollInCourse);

  const handleEnroll = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    enrollInCourse(course.code);
    if (onEnroll) {
      onEnroll(course);
    }
    console.log("Enrolled in:", course.code);
  };

  return (
    <div className={`m-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${
      isCompact ? "p-3" : "p-5"
    }`}>
      <h3 className={`font-bold text-gray-900 dark:text-white ${
        isCompact ? "text-sm" : "text-lg"
      }`}>
        {course.code}
      </h3>
      {!isCompact && (
        <p className="text-gray-600 dark:text-gray-300">{course.title}</p>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {course.units} units — {course.semester}
      </p>
      <button
        type="button"
        onClick={handleEnroll}
        disabled={isEnrolled}
        className="mt-2 rounded bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
      >
        {isEnrolled ? "Enrolled" : "Enroll"}
      </button>
    </div>
  );
}

export default CourseCard;