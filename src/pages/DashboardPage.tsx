import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import type { Course } from "../types/index";
import { fetchCourses } from "../api/client";
import Dashboard from "../components/Dashboard";

function DashboardPage() {
  const userName = useAuthStore((state) => state.userName);
  const { data, isPending, isError, error } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isPending) {
    return <div className="animate-pulse p-6">Loading dashboard...</div>;
  }

  if (isError) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">{error.message}</div>;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        {userName ? `Welcome back, ${userName}.` : "Browse courses or sign in to manage your submissions."}
      </p>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{data.length} courses available</p>
      <Dashboard />
    </div>
  );
}

export default DashboardPage;