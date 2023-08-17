import { createContext, useReducer, useLayoutEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    const fetchNFTs = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchNFTs();
  }, [user]);
  return (
    <NftContext.Provider value={{ ...state, loading, dispatch }}>
      {children}
    </NftContext.Provider>
  );
};
