import { useContext } from "react";
import { UsersContext } from "../context/usersContext";
export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within UsersContextProvider");
  } else {
    return context;
  }
};
