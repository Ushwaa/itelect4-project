import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { askAi } from "../api/client";
import type { AiReviewResponse } from "../types/index";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const aiReviewSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, { message: "Project description must be at least 20 characters long." })
    .max(2000, { message: "Project description must be no more than 2,000 characters long." }),
});

type AiReviewFormValues = z.infer<typeof aiReviewSchema>;

function getReadinessStyles(status: AiReviewResponse["readiness"]): string {
  switch (status) {
    case "ready":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200";
    case "almost":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";
    default:
      return "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200";
  }
}

function AiReviewPage() {
  const [result, setResult] = useState<AiReviewResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AiReviewFormValues>({
    resolver: zodResolver(aiReviewSchema),
    defaultValues: { prompt: "" },
  });

  const mutation = useMutation({
    mutationFn: askAi,
    onSuccess: (data) => {
      setResult(data);
      reset();
    },
  });

  const onSubmit = (values: AiReviewFormValues): void => {
    mutation.mutate(values.prompt);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">AI Project Review</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Describe your project idea and let the backend review it with Gemini.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-2">
          <Label htmlFor="prompt">Project description</Label>
          <textarea
            id="prompt"
            {...register("prompt")}
            rows={8}
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your project, features, stack, workflow, and goals..."
          />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button type="submit" disabled={mutation.isPending || isSubmitting} className="self-start">
            {mutation.isPending ? "Reviewing..." : "Review project"}
          </Button>
          {mutation.isError && (
            <p role="alert" className="text-sm text-red-700">
              {mutation.error instanceof Error ? mutation.error.message : "Unable to review the project."}
            </p>
          )}
        </div>
      </form>

      {result && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Review result</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getReadinessStyles(result.readiness)}`}>
              {result.readiness}
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Summary
              </h4>
              <p className="text-sm leading-6 text-gray-700 dark:text-gray-200">{result.summary}</p>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Strengths
              </h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
                {result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Improvements
              </h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
                {result.improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Next steps
              </h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
                {result.nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiReviewPage;
