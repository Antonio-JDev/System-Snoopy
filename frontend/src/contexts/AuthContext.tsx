import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, type User, type LoginResponse } from '@/lib/auth';
import api from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();

    if (storedToken && storedUser && authService.isAuthenticated()) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      // Limpar dados inválidos
      authService.logout();
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response: LoginResponse = await authService.login(email, password);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user && authService.isAuthenticated();

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

