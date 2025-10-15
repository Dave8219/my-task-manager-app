import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import "../tasks.css";

// using useNavigate instead of <Link>
const LogoutLink = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="logout-div">
      <button className="logout-btn" onClick={handleLogout}>
        <h5>Logout</h5>
      </button>
    </div>
  );
};

export default LogoutLink;
