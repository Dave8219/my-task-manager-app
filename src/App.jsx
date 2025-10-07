import { useState } from "react";
import RenderTasks from "./my-app/Tasks.jsx";
import LoginPage from "./my-app/LoginPage.jsx";
import CreateAccount from "./my-app/CreateAccount.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<RenderTasks />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
