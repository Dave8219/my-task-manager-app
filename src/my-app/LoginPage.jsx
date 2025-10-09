import "./login-page.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-info">
        <div className="username-box">
          <p className="username">Username</p>
          <input />
        </div>
        <div className="password-box">
          <p className="password">Password</p>
          <input type="password" id="password" name="password" />
        </div>
        <div className="submit-box">
          <button className="submit-btn">Submit</button>
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
    </div>
  );
};

export default LoginPage;
