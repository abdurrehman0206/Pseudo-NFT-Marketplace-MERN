import { useNavigate } from "react-router-dom";
import { useNFTContext } from "./useNFTContext";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
export const useLogout = () => {
  const navigate = useNavigate();

  const nftContext = useNFTContext();
  const authContext = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    nftContext.dispatch({ type: "CLEAR_NFTS" });
    authContext.dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return { logout };
};
