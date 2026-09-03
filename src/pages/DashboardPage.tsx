import { useQuery } from "@tanstack/react-query";
import UserCard from "../components/UserCard";
import useToggle from "../hooks/useToggle";
import { useAppContext } from "../context/AppContext";
import type { User } from "../types/index";
import { fetchUsers } from "../api/client";

function DashboardPage() {
  const { state, dispatch } = useAppContext();
  const [showDetails, toggleDetails] = useToggle(false);
  const { data, isPending, isError, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) {
    return <div className="animate-pulse p-6">Loading users...</div>;
  }

  if (isError) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">{error.message}</div>;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onSelect={(selectedUser) =>
              dispatch({ type: "SET_SELECTED_USER", payload: selectedUser })
            }
          />
        ))}
      </div>
      <button
        onClick={toggleDetails}
        className="mt-4 rounded bg-gray-200 px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white"
      >
        {showDetails ? "Hide" : "Show"} Details
      </button>
      {showDetails && state.selectedUser !== null && (
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Selected: {state.selectedUser.name} ({state.selectedUser.role})
        </p>
      )}
    </div>
  );
}

export default DashboardPage;