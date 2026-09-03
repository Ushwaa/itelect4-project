import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { submissionSchema } from "../schemas/submissionSchema";
import type { SubmissionFormValues } from "../schemas/submissionSchema";

import type { ApiSubmission } from "../types/index";
import SubmissionBadge from "../components/SubmissionBadge";
import { fetchSubmissions, createSubmission, gradeSubmission } from "../api/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmissionsPage() {
  const queryClient = useQueryClient();

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
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset();
    },
  });

  const gradeMutation = useMutation({
    mutationFn: ({ id, score }: { id: string; score: number }) =>
      gradeSubmission(id, { score }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });

  // The write path still goes through the Session 7 useMutation (addSubmission).
  // React Hook Form + Zod only gate what reaches onSubmit.
  const onSubmit = (values: SubmissionFormValues): void => {
    addSubmission.mutate({
      studentId: 1,
      courseCode: values.courseCode,
      repoUrl: values.repoUrl,
      submittedAt: new Date().toISOString(),
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6">Loading submissions...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load submissions.
      </div>
    );
  }

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
            <option value="ITELECT4">ITELECT4</option>
            <option value="ITELECT3">ITELECT3</option>
            <option value="CSSWENG">CSSWENG</option>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((s) => (
          <SubmissionBadge
            key={s.id}
            submission={s}
            onGrade={(submission) =>
              gradeMutation.mutate({ id: submission.id, score: 95 })
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