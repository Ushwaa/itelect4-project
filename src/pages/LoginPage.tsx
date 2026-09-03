import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (): void => {
    login(name);
    navigate("/submissions");
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Login
      </h2>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            ref={nameInputRef}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <Button
          type="submit"
          disabled={name === ""}
          className="self-start"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;