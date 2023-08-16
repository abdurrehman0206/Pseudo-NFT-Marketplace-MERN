import { createContext, useReducer, useLayoutEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const nftReducer = (state, action) => {
  switch (action.type) {
    case "SET_NFTS":
      return {
        nfts: action.payload,
      };

    case "ADD_NFT":
      return {
        nfts: [...state.blogs, action.payload],
      };
      case "LIKE_NFT":
        
    case "CLEAR_NFTS":
      return {
        nfts: null,
      };

    default:
      return state;
  }
};
export const NftContext = createContext();
export const NftContextProvider = ({ children }) => {
  const initialState = {
    nfts: null,
  };

  const [state, dispatch] = useReducer(nftReducer, initialState);
  const { user } = useAuthContext();
  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    const fetchNFTs = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/nfts`,
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
            type: "SET_NFTS",
            payload: json.data,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNFTs();
  }, [user]);
  return (
    <NftContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NftContext.Provider>
  );
};
