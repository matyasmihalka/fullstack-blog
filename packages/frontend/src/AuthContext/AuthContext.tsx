import { createContext, useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  isAuthenticating: boolean;
  logout: () => void;
}>({
  isLoggedIn: false,
  isAuthenticating: false,
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, isLoading]);

  const logout = async () => {
    const response = await fetch("//localhost:3001/api/auth/logout", {
      method: "GET",
      credentials: "include", // Necessary to include the HTTP-only cookie in the request
    });

    setIsLoggedIn(false);
    navigate("/login");

    console.log("logout: ", response);

    await client.resetStore();
  };

  // Attempt to validate the session on initial load
  useEffect(() => {
    const validateSession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("//localhost:3001/api/auth/validate", {
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logout, isAuthenticating: isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
