import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NftContextProvider } from "./context/NFTContext";
import { UsersContextProvider } from "./context/usersContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <NftContextProvider>
      <UsersContextProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={true}
          theme="dark"
        />
        <App />
      </UsersContextProvider>
    </NftContextProvider>
  </AuthContextProvider>
  // {/* </React.StrictMode> */}
);
