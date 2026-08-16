import React from "react";
import { useAppContext } from "../context/AppContext";

const Dashboard: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleToggleTheme = (): void => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const handleAddNotification = (): void => {
    dispatch({ type: "ADD_NOTIFICATION", payload: `Notification ${state.notifications.length + 1}` });
  };

  const handleClearNotifications = (): void => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
  };

  const handleAddCourse = (): void => {
    dispatch({
      type: "ADD_COURSE",
      payload: {
        code: `NEW${state.courses.length + 1}`,
        title: `New Course ${state.courses.length + 1}`,
        units: 3,
        semester: "1st Semester",
      },
    });
  };

  return (
    <section>
      <h2>Dashboard</h2>
      <p>Current theme: {state.theme}</p>
      <p>Number of courses: {state.courses.length}</p>
      <p>Selected user: {state.selectedUser ? state.selectedUser.name : "None"}</p>
      <p>Notification count: {state.notifications.length}</p>

      <button type="button" onClick={handleToggleTheme}>Toggle Theme</button>
      <button type="button" onClick={handleAddNotification}>Add Notification</button>
      <button type="button" onClick={handleClearNotifications}>Clear Notifications</button>
      <button type="button" onClick={handleAddCourse}>Add Course</button>
    </section>
  );
};

export default Dashboard;
