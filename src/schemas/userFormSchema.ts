import { z } from "zod";

export const userFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name cannot exceed 50 characters.")
    .refine((value) => /[a-zA-Z]/.test(value) && !/^\d+$/.test(value), {
      message: "Name must contain letters and cannot be only numbers.",
    }),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .refine(
      (value) => {
        const [localPart, domain] = value.split("@");
        return Boolean(
          localPart &&
            domain &&
            domain.includes(".") &&
            !domain.startsWith(".") &&
            !domain.endsWith(".")
        );
      },
      {
        message: "Email must include a valid domain.",
      }
    ),
});

export type UserFormData = z.infer<typeof userFormSchema>;
