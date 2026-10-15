import { createContext, useContext, useEffect, useState } from "react";
import {
  clearSession,
  loadSession,
  saveSession,
} from "../services/tokenStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const stored = await loadSession();
      setSession(stored);
      setLoading(false);
    };

    restoreSession();
  }, []);

  const signIn = async (newSession) => {
    await saveSession(newSession);
    setSession(newSession);
  };

  const signOut = async () => {
    await clearSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);