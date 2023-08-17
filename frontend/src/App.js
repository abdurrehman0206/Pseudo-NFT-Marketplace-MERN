import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import Cart from "./pages/Cart/Cart";
import Collections from "./pages/Collections/Collections";
import NFT from "./pages/NFT/NFT";
import Artists from "./pages/Artists/Artists";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App-container">
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/collections"
              element={user ? <Collections /> : <Navigate to="/login" />}
            />
            <Route
              path="/artists"
              element={user ? <Artists /> : <Navigate to="/login" />}
            />
            <Route
              path="/collections/:nftId"
              element={user ? <NFT /> : <Navigate to="/login" />}
            />

            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="*"
              element={user ? <NotFound /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
