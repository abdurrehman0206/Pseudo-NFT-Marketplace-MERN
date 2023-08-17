import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { BsCartCheck } from "react-icons/bs";
function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="nav-logo">
          <h1>
            R<span className="c-ac3">i</span>s<span className="c-ac1">i</span>d
            <span className="c-ac2">i</span>o
          </h1>
        </div>

        <div className="nav-actions">
          {!user ? (
            <NavLink to="/login" className="btn-primary">
              Login
            </NavLink>
          ) : (
            <>
              <div className="nav-user-info">
                <img src={user.image} alt="User" />
                <p className="c-ac2">{user.username}</p>
                <span>
                  <NavLink to="/cart">
                    <BsCartCheck className="user-cart" />
                  </NavLink>
                  {user?.shoppingCart?.length}
                </span>
              </div>
              <button onClick={() => logout()} className="btn-outline">
                Logout
              </button>
            </>
          )}
        </div>
        {user && (
          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/collections">Collections</NavLink>
            <NavLink to="/Artists">Artists</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
