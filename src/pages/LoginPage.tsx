import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { loginUser } from "../api/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schemas/authSchemas";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    setErrorMessage(null);
    try {
      const session = await loginUser(values);
      setSession(session.token, session.user.username, session.user.id);
      navigate("/submissions", { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to log in.");
    }
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Login
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
        {errorMessage && <p role="alert" className="text-sm text-red-700">{errorMessage}</p>}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="self-start"
        >
          {isSubmitting ? "Signing in..." : "Log In"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        New here? <Link className="text-blue-700 underline" to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default LoginPage;