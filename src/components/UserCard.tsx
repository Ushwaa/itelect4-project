import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onSelect(user);
    console.log("User selected:", user.name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Search input:", e.target.value);
  };

  return (
    <div className="m-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {user.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Role: {user.role}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {user.isActive ? '✅ Active' : '❌ Inactive'}
      </p>
      
      <input
        type="text"
        placeholder="Quick note..."
        onChange={handleChange}
        className="mt-2 w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      
      <button
        onClick={handleClick}
        className="mt-3 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Select User
      </button>
    </div>
  );
}

export default UserCard;