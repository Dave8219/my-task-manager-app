import { useState, useContext } from "react";
import RenderTasks from "./my-app/Tasks.jsx";
import LoginPage from "./my-app/LoginPage.jsx";
import CreateAccount from "./my-app/CreateAccount.jsx";
import VerifyEmail from "./my-app/VerifyEmail.jsx";
import { AuthContext, AuthProvider } from "./my-app/AuthContext.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

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
                  <RenderTasks />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/verify" element={<VerifyEmail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
