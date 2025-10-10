import "./login-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <form className="login-container" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="login-info">
          <div className="username-box">
            <p className="username">Username</p>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="username"
            />
          </div>
          <div className="password-box">
            <p className="password">Password</p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>
          <div className="submit-box">
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </div>
          <div className="forgot-box">
            <p className="forgot-user">
              <a href="/verify"> Forgot Username </a>
            </p>
            <p className="forgot-pass">
              <a href="/verify"> Forgot Password </a>
            </p>
          </div>
        </div>
        <h4>
          <Link to="/create-account">Create Account</Link>
        </h4>
      </form>
    </div>
  );
};

export default LoginPage;
