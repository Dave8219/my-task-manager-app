import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Task Manager</h1>
        <p className="home-subtitle">
          Stay organized, manage your daily tasks, and track progress
          efficiently.
        </p>
        <div className="home-buttons">
          <Link to="/user/login" className="home-btn login-btn">
            Login
          </Link>
          <Link to="/new-user/create-account" className="home-btn register-btn">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
