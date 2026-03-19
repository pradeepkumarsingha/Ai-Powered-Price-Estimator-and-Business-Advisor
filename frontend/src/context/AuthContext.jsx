import { createContext, useEffect, useMemo, useState } from "react";
import {
  fetchCurrentUser,
  login as loginRequest,
  loginWithGoogle as loginWithGoogleRequest,
  register as registerRequest
} from "../api/auth";

export const AuthContext = createContext(null);

const TOKEN_KEY = "estateai_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
      } catch (_error) {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const persistAuth = (result) => {
    localStorage.setItem(TOKEN_KEY, result.token);
    setUser(result.user);
    return result;
  };

  const login = async (payload) => {
    const result = await loginRequest(payload);
    return persistAuth(result);
  };

  const register = async (payload) => {
    const result = await registerRequest(payload);
    return persistAuth(result);
  };

  const loginWithGoogle = async (credential) => {
    const result = await loginWithGoogleRequest(credential);
    return persistAuth(result);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      loginWithGoogle,
      logout
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
