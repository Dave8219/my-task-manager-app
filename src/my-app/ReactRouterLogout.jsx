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
      <Link to="/login">Logout</Link>
    </div>
  );
};

export default ReactRouterLogout;
