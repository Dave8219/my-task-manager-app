import "./tasks.css";

const VerifyEmail = () => {
  return (
    <div>
      <form>
        <h1>Verify Email</h1>
        <div>
          <label>Email:</label>
          <input />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
