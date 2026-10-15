import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";
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

      if (!stored) {
        setLoading(false);
        return;
      }

      try {
        await getCurrentUser(stored.token);
        setSession(stored);
      } catch (error) {
        if (error.status === 401) {
          await clearSession();
          setSession(null);
        } else {
          setSession(stored);
        }
      }

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