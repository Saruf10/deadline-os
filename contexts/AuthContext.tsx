"use client";

import {
  createContext,
  useContext,
  ReactNode,
} from "react";

import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthContextType {
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, loading] = useAuthState(auth);

  return (
    <AuthContext.Provider
      value={{ user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}