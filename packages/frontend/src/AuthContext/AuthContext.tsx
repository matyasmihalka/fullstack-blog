import { createContext, useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { UserInfo } from "@shared/types";

export const AuthContext = createContext<{
  isAuthenticating: boolean;
  user: UserInfo | null;
  logout: () => void;
}>({
  isAuthenticating: false,
  logout: () => {},
  user: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, navigate, isLoading]);

  // Attempt to validate the session on initial load
  useEffect(() => {
    const validateSession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("//localhost:3001/api/auth/validate", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // User is logged in
        } else {
          setUser(null); // User is not logged in
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  const logout = async () => {
    setUser(null);

    await fetch("//localhost:3001/api/auth/logout", {
      method: "GET",
      credentials: "include", // Necessary to include the HTTP-only cookie in the request
    });

    navigate("/login");

    await client.resetStore();
  };

  return (
    <AuthContext.Provider value={{ logout, isAuthenticating: isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
