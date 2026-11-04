import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CourseCard from "./CourseCard";
import useUiStore from "../store/uiStore";
import type { Course } from "../types/index";

const course: Course = {
  code: "ITELECT4",
  title: "Advanced TypeScript",
  units: 3,
  semester: "1st Semester 2026-2027",
};

beforeEach(() => {
  useUiStore.setState({ enrolledCourseCodes: [] });
});

describe("CourseCard", () => {
  it("shows course details and enrolls the user when clicked", async () => {
    const user = userEvent.setup();
    const onEnroll = vi.fn();
    render(<CourseCard course={course} onEnroll={onEnroll} />);

    expect(screen.getByRole("heading", { name: "ITELECT4" })).toBeInTheDocument();
    expect(screen.getByText("Advanced TypeScript")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Enroll" }));

    expect(screen.getByRole("button", { name: "Enrolled" })).toBeDisabled();
    expect(onEnroll).toHaveBeenCalledWith(course);
  });
});
