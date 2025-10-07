import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./LoginPage";

const ReactRouterLogout = () => {
  // const navigate = useNavigate();
  return (
    <div style={{ textAlign: "end" }}>
      <Link
        to="/login"
        style={{
          color: "#202bf3ff;",
          fontSize: "1rem",
          fontWeight: "700",
        }}
      >
        Logout
      </Link>
    </div>
  );
};

export default ReactRouterLogout;
