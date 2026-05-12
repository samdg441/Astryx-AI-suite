'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { AuthUser } from '@/lib/authApi';
import { fetchCurrentUser } from '@/lib/authApi';

const STORAGE_KEY = 'astryx_auth_token';
const STORAGE_USER = 'astryx_auth_user';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  setSession: (payload: { user: AuthUser; token: string }) => void;
  logout: () => void;
  /** Sincroniza plan/suscripción con el servidor (tras checkout o webhook). */
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    const t = token ?? (typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null);
    if (!t) return;
    try {
      const fresh = await fetchCurrentUser(t);
      setUser(fresh);
      localStorage.setItem(STORAGE_USER, JSON.stringify(fresh));
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_USER);
    }
  }, [token]);

  useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_KEY);
      const u = localStorage.getItem(STORAGE_USER);
      if (t && u) {
        setToken(t);
        setUser(JSON.parse(u) as AuthUser);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_USER);
    }
  }, []);

  /** Tras hidratar token desde localStorage, alinear plan con el backend. */
  useEffect(() => {
    if (!token) return;
    void refreshUser();
  }, [token, refreshUser]);

  const setSession = useCallback((payload: { user: AuthUser; token: string }) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem(STORAGE_KEY, payload.token);
    localStorage.setItem(STORAGE_USER, JSON.stringify(payload.user));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_USER);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      setSession,
      logout,
      refreshUser,
    }),
    [user, token, setSession, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
