import "./styles/login-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/AuthContext";
import axios from "axios";

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      navigate("/tasks", { replace: true });
    } catch (error) {
      // console.log(error, "Login Failed:", error.response?.data || error.message);
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data.message || "Login failed. Please try again.");
    }
  };

  // frontend only logic and functionality before backend connection
  /*
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate("/", { replace: true });
  };
*/
  return (
    <div>
      <form className="login-container" onSubmit={handleLogin}>
        <h1 className="login-header">Login</h1>
        <div className="login-info">
          <div className="username-box">
            <p className="username">Email</p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              autoComplete="username"
            />
          </div>
          <div className="password-box">
            <p className="password">Password</p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              autoComplete="current-password"
            />
          </div>
          <div className="submit-box">
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </div>
          <div className="forgot-box">
            <p>
              <a href="/verify" className="forgot-user">
                {" "}
                Forgot Username{" "}
              </a>
            </p>
            <p>
              <a href="/verify" className="forgot-pass">
                {" "}
                Forgot Password{" "}
              </a>
            </p>
          </div>
        </div>
        <h4>
          <Link to="/new-user/create-account" className="create-account-btn">
            Create Account
          </Link>
        </h4>
      </form>
    </div>
  );
};

export default LoginPage;
