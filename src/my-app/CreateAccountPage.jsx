import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/create-account.css";

const CreateAccount = () => {
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser = Object.fromEntries(formData);

    setLoading(true); // start loading
    setMessage(""); // clear previous message
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/new-user/create-account`,
        newUser
      );
      setMessage(res.data.msg || "Account created Successfully!");
      // use reset() only to clear the input fields after entry. Not necessary in this case...
      // e.currentTarget.reset();

      // Optionally redirect user to login after short delay
      setTimeout(() => navigate("/user/login"), 2000);
      console.log(newUser);
      setValue(value + 1);
    } catch (error) {
      console.error("Error response:", error.response);
      setMessage(
        error.response?.data?.msg ||
          error.message ||
          "Something went wrong. Please try again"
      );
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Create New Account</h4>
        {/* name */}
        <div className="form-row">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input type="text" className="form-input" id="name" name="name" />
        </div>
        {/* email */}
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-input" id="email" name="email" />
        </div>
        {/* email */}
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-block">
          {loading ? "Creating Account..." : "Submit"}
        </button>
        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </form>
    </div>
  );
};

export default CreateAccount;
