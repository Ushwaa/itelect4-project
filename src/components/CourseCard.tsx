import React from "react";
import type { Course } from "../types/index";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <section>
      <h3>{course.title}</h3>
      <p>Code: {course.code}</p>
      <p>Units: {course.units}</p>
      <p>Semester: {course.semester}</p>
    </section>
  );
};

export default CourseCard;
