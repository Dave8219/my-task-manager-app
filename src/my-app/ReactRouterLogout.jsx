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
    <Router>
      <div style={{ textAlign: "end" }}>
        <Link to="/login">Logout</Link>
      </div>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default ReactRouterLogout;
