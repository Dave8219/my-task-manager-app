import { useState, useContext } from "react";
import RenderTasksPage from "./my-app/RenderTasksPage.jsx";
import LoginPage from "./my-app/LoginPage.jsx";
import CreateAccountPage from "./my-app/CreateAccountPage.jsx";
import VerifyEmailPage from "./my-app/VerifyEmailPage.jsx";
import { AuthContext, AuthProvider } from "./my-app/components/AuthContext.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <RenderTasksPage />
                </RequireAuth>
              }
            />
            <Route path="/user/login" element={<LoginPage />} />
            <Route
              path="/new-user/create-account"
              element={<CreateAccountPage />}
            />
            <Route path="/verify" element={<VerifyEmailPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/user/login" replace />;
};

export default App;
