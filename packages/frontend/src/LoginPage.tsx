import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCtx } from "./AuthContext/useAuthCtx";
import { Button } from "@/components/ui/button";
import { Google } from "./components/icons/Google";

const LoginPage = () => {
  const { user } = useAuthCtx();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to the root page if already logged in
    }
  }, [user, navigate]);

  const handleClick = async () => {
    window.location.href = "//localhost:3001/api/auth/google/login";
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="mb-32">
        <Button size="lg" onClick={handleClick} variant="default">
          <span className="mr-2">Log in with</span>
          <Google />
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
