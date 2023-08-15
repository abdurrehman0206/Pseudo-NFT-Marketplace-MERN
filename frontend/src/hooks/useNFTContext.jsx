import { useContext } from "react";
import { NftContext } from "../context/NFTContext";
export const useNFTContext = () => {
  const context = useContext(NftContext);
  if (!context) {
    throw new Error("useNftContext must be used within NftContextProvider");
  } else {
    return context;
  }
};
