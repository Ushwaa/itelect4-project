import React, { useState } from "react";

interface UserFormData {
  name: string;
  email: string;
}

const initialFormData: UserFormData = {
  name: "",
  email: "",
};

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((previousData: UserFormData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const nextErrors: string[] = [];

    if (formData.name.trim() === "") {
      nextErrors.push("Name cannot be empty.");
    }

    if (formData.email.trim() === "") {
      nextErrors.push("Email cannot be empty.");
    } else if (!formData.email.includes("@")) {
      nextErrors.push("Email must include @.");
    }

    setErrors(nextErrors);

    if (nextErrors.length > 0) {
      setSuccessMessage("");
      return;
    }

    setSuccessMessage("User saved successfully!");
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>User Form</h3>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      {errors.length > 0 && (
        <ul>
          {errors.map((errorMessage: string) => (
            <li key={errorMessage}>{errorMessage}</li>
          ))}
        </ul>
      )}

      {successMessage && <p>{successMessage}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
