import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";

const ReactRouterLogin = () => {
  return (
    <Router>
      <Link to="/login">Login</Link>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      ;
    </Router>
  );
};

export default ReactRouterLogin;
