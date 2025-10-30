import "./styles/tasks.css";
import { useState } from "react";
import axios from "axios";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email }
      );

      setMessage(res.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Verify Email</h1>
        <div>
          <label className="email-line">Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
