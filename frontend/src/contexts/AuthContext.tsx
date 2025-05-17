import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } from '../services/authApi';

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const navigate = useNavigate();
  
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  
  const { data: userData, isLoading: isUserLoading, error: userError } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });
  
  // Обновляем пользователя при получении данных
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
    
    if (userError) {
      // Если ошибка при получении пользователя, очищаем токен
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
    
    if (!isUserLoading) {
      setIsLoading(false);
    }
  }, [userData, userError, isUserLoading]);
  
  const login = async (email: string, password: string) => {
    try {
      const result = await loginMutation({ email, password }).unwrap();
      localStorage.setItem('token', result.access_token);
      setToken(result.access_token);
      
      // Получаем данные пользователя после успешного входа
      const userResult = await fetch('/api/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${result.access_token}`
        }
      });
      
      if (!userResult.ok) {
        throw new Error('Не удалось получить данные пользователя');
      }
      
      const userData = await userResult.json();
      setUser(userData);
      
      return result;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.data?.detail || 'Ошибка при входе');
    }
  };
  
  const register = async (userData: any) => {
    try {
      const result = await registerMutation(userData).unwrap();
      // После регистрации автоматически входим
      await login(userData.email, userData.password);
      return result;
    } catch (error: any) {
      console.error('Register error:', error);
      throw new Error(error.data?.detail || 'Ошибка при регистрации');
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };
  
  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
