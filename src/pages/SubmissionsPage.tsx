import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { submissionSchema } from "../schemas/submissionSchema";
import type { SubmissionFormValues } from "../schemas/submissionSchema";

import type { ApiSubmission } from "../types/index";
import type { Course } from "../types/index";
import SubmissionBadge from "../components/SubmissionBadge";
import { fetchCourses, fetchSubmissions, createSubmission, gradeSubmission } from "../api/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "../store/authStore";

function SubmissionsPage() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.userId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
    defaultValues: {
      courseCode: "",
      repoUrl: "",
    },
  });

  const { data, isPending, isError } = useQuery<ApiSubmission[]>({
    queryKey: ["submissions", userId],
    queryFn: fetchSubmissions,
  });
  const coursesQuery = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions", userId] });
      reset();
    },
  });

  const gradeMutation = useMutation({
    mutationFn: ({ id, score }: { id: string; score: number }) =>
      gradeSubmission(id, { score }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions", userId] });
    },
  });

  // The write path still goes through the Session 7 useMutation (addSubmission).
  // React Hook Form + Zod only gate what reaches onSubmit.
  const onSubmit = (values: SubmissionFormValues): void => {
    addSubmission.mutate(values);
  };

  if (isPending || coursesQuery.isPending) {
    return <div className="animate-pulse p-6">Loading submissions...</div>;
  }

  if (isError || coursesQuery.isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {isError ? "Could not load submissions." : coursesQuery.error?.message ?? "Could not load courses."}
      </div>
    );
  }

  const courses = coursesQuery.data;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Submissions
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="courseCode">Course</Label>
          <select
            id="courseCode"
            {...register("courseCode")}
            aria-invalid={errors.courseCode ? true : undefined}
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            <option value="">Choose a course...</option>
            {courses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
          {errors.courseCode && (
            <p className="text-sm text-red-600">
              {errors.courseCode.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="repoUrl">Repository URL</Label>
          <Input
            id="repoUrl"
            {...register("repoUrl")}
            aria-invalid={errors.repoUrl ? true : undefined}
            placeholder="https://github.com/you/your-repo"
          />
          {errors.repoUrl && (
            <p className="text-sm text-red-600">
              {errors.repoUrl.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={addSubmission.isPending}
          className="self-start"
        >
          {addSubmission.isPending ? "Saving..." : "Add submission"}
        </Button>
      </form>
      {addSubmission.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addSubmission.error.message}
        </p>
      )}
      {gradeMutation.isError && (
        <p role="alert" className="mb-4 text-sm text-red-700">{gradeMutation.error.message}</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.length === 0 && <p className="text-sm text-gray-600 dark:text-gray-300">No submissions yet.</p>}
        {data.map((s) => (
          <SubmissionBadge
            key={s._id}
            submission={s}
            onGrade={(submission) =>
              gradeMutation.mutate({ id: submission._id, score: 95 })
            }
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Course: {s.courseCode}
            </p>
          </SubmissionBadge>
        ))}
      </div>
    </div>
  );
}

export default SubmissionsPage;