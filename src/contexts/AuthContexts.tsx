import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  avatarId: number;
  signIn(email: string, senha: string): Promise<void>;
  signUp(nome: string, email: string, senha: string): Promise<void>;
  signOut(): Promise<void>;
  updateAvatar(index: number): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarId, setAvatarId] = useState<number>(0);

  const avatars = [
    require('../styles/avatar/1.jpg'),
    require('../styles/avatar/2.jpg'),
    require('../styles/avatar/3.jpg'),
    require('../styles/avatar/4.jpg'),
    require('../styles/avatar/5.jpg'),
    require('../styles/avatar/6.jpg'),
    require('../styles/avatar/7.jpg'),
    require('../styles/avatar/8.jpg'),
    require('../styles/avatar/9.jpg'),
    require('../styles/avatar/10.jpg'),
    require('../styles/avatar/11.jpg'),
    require('../styles/avatar/12.jpg'),
  ];

  // Carregar sessão e avatar salvos
  useEffect(() => {
    async function loadStorage() {
      const userStorage = await AsyncStorage.getItem('@user');
      const tokenStorage = await AsyncStorage.getItem('@token');
      const avatarStorage = await AsyncStorage.getItem('@avatarIndex');

      if (userStorage && tokenStorage) {
        setUser(JSON.parse(userStorage));
        setToken(tokenStorage);
      }

      if (avatarStorage) {
        setAvatarId(Number(avatarStorage));
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  // Login
  async function signIn(email: string, senha: string) {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Erro ao fazer login');

    setUser(data.user);
    setToken(data.token);

    const index = data.user.avatar_id ?? 0;
    setAvatarId(index);

    await AsyncStorage.setItem('@user', JSON.stringify(data.user));
    await AsyncStorage.setItem('@token', data.token);
    await AsyncStorage.setItem('@avatarId', String(index));
  }

  // Registro
  async function signUp(nome: string, email: string, senha: string) {
    const response = await fetch('http://localhost:8000/api/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Erro ao criar conta');

    setUser(data.user);
    setToken(data.token);

    const index = data.user.avatar_id ?? 0;
    setAvatarId(index);

    await AsyncStorage.setItem('@user', JSON.stringify(data.user));
    await AsyncStorage.setItem('@token', data.token);
    await AsyncStorage.setItem('@avatarId', String(index));
  }

  // Logout
  async function signOut() {
    if (!token) return;

    const response = await fetch(`http://localhost:8000/api/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer logout');
    }

    await AsyncStorage.multiRemove([
      '@user',
      '@token',
    ]);

    setUser(null);
    setToken(null);

  }

  // Atualizar avatar
  async function updateAvatar(index: number) {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:8000/api/user/avatar', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_index: index }),
      });

      const data = await response.json();

      if (!data.success) throw new Error('Não foi possível atualizar o avatar');

      setAvatarId(index);
      await AsyncStorage.setItem('@avatarId', String(index));
    } catch (err) {
      console.error('Erro ao atualizar avatar:', err);
      throw err;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        avatarId,
        signIn,
        signUp,
        signOut,
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
