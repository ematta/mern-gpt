import { createContext, useContext, useEffect, useState } from 'react';
import { checkAuthStatus, loginUser } from '../helpers/api';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({email: data.email, name: data.name});
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({email: data.email, name: data.name});
      setIsLoggedIn(true);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Signup user
    // Set user state
  };

  const logout = async () => {
    // Logout user
    // Set user state
  };

  const value = {
    isLoggedIn,
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
