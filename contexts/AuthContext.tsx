"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { AuthServiceClient } from "@/lib/auth-client";
import { User } from "@/lib/auth-types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>; // Modifié pour retourner User
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    if (!initialUser) {
      const currentUser = AuthServiceClient.getClientUser();
      setUser(currentUser);
      setLoading(false);
    }
  }, [initialUser]);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const user = await AuthServiceClient.login(email, password);
      setUser(user);
      return user; // Retourne explicitement l'utilisateur
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthServiceClient.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false,
    loading,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
