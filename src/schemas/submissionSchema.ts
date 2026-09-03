import { z } from "zod";

// Single source of truth for the submission form's validation and its
// TypeScript type. The form type is derived below via z.infer, so there is
// no hand-written duplicate interface to keep in sync.
export const submissionSchema = z.object({
  courseCode: z.string().min(1, "Choose a course."),
  repoUrl: z
    .url("That is not a valid URL -- include https://")
    .refine(
      (url) => url.includes("github.com"),
      "It has to be a GitHub URL."
    ),
});

export type SubmissionFormValues = z.infer<typeof submissionSchema>;