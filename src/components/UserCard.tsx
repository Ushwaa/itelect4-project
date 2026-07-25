import React from "react";
import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onSelect(user);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
  };

  return (
    <section>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <input type="text" placeholder="Type something" onChange={handleInputChange} />
      <button type="button" onClick={handleClick}>
        Select User
      </button>
    </section>
  );
};

export default UserCard;
