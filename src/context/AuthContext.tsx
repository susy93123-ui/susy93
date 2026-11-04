import React, { createContext, useContext, useState } from 'react';

export interface AdminUser {
  name: string;
  email: string;
  role: 'Administrator' | 'Koordinator Kurikulum';
}

interface AuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'sipid_admin_auth_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const login = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Primary administrator credentials requested by user
    if (cleanEmail === 'susy93123@gmail.com' && cleanPass === 'Susi851692K') {
      const user: AdminUser = {
        name: 'Susy (Administrator SIPID)',
        email: 'susy93123@gmail.com',
        role: 'Administrator',
      };
      setAdminUser(user);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } catch {
        // ignore
      }
      return true;
    }

    // Secondary fallback demo credentials
    if (
      (cleanEmail === 'admin@sdnmendongan.sch.id' && cleanPass === 'sipid2026') ||
      (cleanEmail === 'admin' && cleanPass === 'admin')
    ) {
      const user: AdminUser = {
        name: 'Administrator SD Negeri Mendongan',
        email: cleanEmail,
        role: 'Administrator',
      };
      setAdminUser(user);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
