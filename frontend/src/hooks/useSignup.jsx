import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (email, password, fullname, username, image) => {
    setError(null);
    setLoading(true);
    try {
      let user = {
        email: email,
        password: password,
        fullname: fullname,
        username: username,
      };
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ml_default");
      const imageUp = await fetch(`${process.env.REACT_APP_CLURL}`, {
        method: "POST",
        body: formData,
      });
      const imgJson = await imageUp.json();
      if (imgJson.url) {
        user = {
          ...user,
          image: imgJson.url,
        };
      } else {
        user = {
          ...user,
          image:
            "https://z53d2b.p3cdn1.secureserver.net/wp-content/uploads/2020/05/Male-placeholder-1.jpeg",
        };
      }
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/signup`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("user", JSON.stringify(json.user));
        dispatch({
          type: "LOGIN",
          payload: json.user,
        });
        toast.success(json.message);
        setLoading(false);
        setError(null);
      } else {
        toast.error(json.message);
        setLoading(false);
        setError(json.message);
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setError(err.message);
    }
  };
  return { signup, loading, error };
};
