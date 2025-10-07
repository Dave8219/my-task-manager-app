import { useNavigate } from "react-router-dom";
// using useNavigate instead of <Link>
const LogoutLink = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/login", { replace: true });
      }}
    >
      <h5>Logout</h5>
    </button>
  );
};

export default LogoutLink;
