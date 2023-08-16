import { createContext, useReducer, useLayoutEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };

    case "CLEAR_USERS":
      return {
        users: null,
      };

    default:
      return state;
  }
};
export const UsersContext = createContext();
export const UsersContextProvider = ({ children }) => {
  const initialState = {
    users: null,
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { user } = useAuthContext();
  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    const fetchusers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        if (response.ok && json.success) {
          dispatch({
            type: "SET_USERS",
            payload: json.users,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchusers();
  }, [user]);
  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
