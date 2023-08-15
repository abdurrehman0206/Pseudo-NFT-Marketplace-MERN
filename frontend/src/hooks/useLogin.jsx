import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/login`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        toast.success(json.message);
        setLoading(false);
        setError(null);
        dispatch({
          type: "LOGIN",
          payload: json.user,
        });
        localStorage.setItem("user", JSON.stringify(json.user));
      } else {
        toast.error(error);
        setLoading(false);
        setError(json.error);
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setError(err.message);
    }
  };
  return { login, loading, error };
};
