import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCtx } from "./AuthContext/useAuthCtx";

const LoginPage = () => {
  const { isLoggedIn } = useAuthCtx();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to the root page if already logged in
    }
  }, [isLoggedIn, navigate]);

  const handleClick = async () => {
    window.location.href = "//localhost:3001/api/auth/google/login";
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleClick}>Sign up with google</button>
    </div>
  );
};

export default LoginPage;
