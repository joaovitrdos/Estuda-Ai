import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface User {
  id: number
  name: string
  email: string
}

interface Tema {
  temaId: number
  tema: string
  conclusao: boolean
}

interface Questao {
  questao: string
  alternativa1: string
  alternativa2: string
  alternativa3: string
  alternativa4: string
}

interface ConjuntoFormatado {
  id: number
  questoes: Questao[]
}

interface AuthContextData {
  user: User | null
  token: string | null
  loading: boolean
  avatarId: number
  temaId: number | null
  signIn(email: string, senha: string): Promise<void>
  signUp(nome: string, email: string, senha: string): Promise<void>
  signOut(): Promise<void>
  updateAvatar(index: number): Promise<void>
  createTema(tema: string): Promise<any>
  listarTemas(): Promise<Tema[]>
  setTemaAtual(id: number): Promise<void>
  listaConjuntos(temaId: number): Promise<ConjuntoFormatado[]>
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [avatarId, setAvatarId] = useState<number>(0)
  const [temaId, setTemaId] = useState<number | null>(null)

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
  ]

  useEffect(() => {
    async function loadStorage() {
      const userStorage = await AsyncStorage.getItem('@user')
      const tokenStorage = await AsyncStorage.getItem('@token')
      const avatarStorage = await AsyncStorage.getItem('@avatarId')
      const temaStorage = await AsyncStorage.getItem('@temaId')

      if (userStorage && tokenStorage) {
        setUser(JSON.parse(userStorage))
        setToken(tokenStorage)
      }

      if (avatarStorage) {
        setAvatarId(Number(avatarStorage))
      }

      if (temaStorage) {
        setTemaId(Number(temaStorage))
      }

      setLoading(false)
    }

    loadStorage()
  }, [])

  async function signIn(email: string, senha: string) {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Erro ao fazer login')

    setUser(data.user)
    setToken(data.token)

    const index = data.user.avatar_id ?? 0
    setAvatarId(index)

    await AsyncStorage.setItem('@user', JSON.stringify(data.user))
    await AsyncStorage.setItem('@token', data.token)
    await AsyncStorage.setItem('@avatarId', String(index))
  }

  async function signUp(nome: string, email: string, senha: string) {
    const response = await fetch('http://localhost:8000/api/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ nome, email, senha }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Erro ao criar conta')

    setUser(data.user)
    setToken(data.token)

    const index = data.user.avatar_id ?? 0
    setAvatarId(index)

    await AsyncStorage.setItem('@user', JSON.stringify(data.user))
    await AsyncStorage.setItem('@token', data.token)
  }

  async function signOut() {
    if (!token) return

    await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    await AsyncStorage.multiRemove([
      '@user',
      '@token',
      '@temaId',
    ])

    setUser(null)
    setToken(null)
    setTemaId(null)
  }

  async function updateAvatar(index: number) {
    if (!token) return

    const response = await fetch('http://localhost:8000/api/user/avatar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar_Id: index }),
    })

    const data = await response.json()
    if (!data.success) throw new Error('Erro ao atualizar avatar')

    setAvatarId(index)
    await AsyncStorage.setItem('@avatarId', String(index))
  }

  async function createTema(tema: string) {
    if (!token) throw new Error('Usuário não autenticado')

    const response = await fetch(
      `http://localhost:8000/api/gerarOuBuscarTema?tema=${encodeURIComponent(tema)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    )

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error(data.message || 'Erro ao criar tema')
    }

    return data
  }

  async function listarTemas(): Promise<Tema[]> {
    if (!token) throw new Error('Usuário não autenticado')

    const response = await fetch('http://localhost:8000/api/temasUsuario', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    return await response.json()
  }

  async function setTemaAtual(id: number) {
    setTemaId(id)
    await AsyncStorage.setItem('@temaId', String(id))
  }

 async function listaConjuntos(temaId: number): Promise<ConjuntoFormatado[]> {
  if (!token) throw new Error('Usuário não autenticado')

  const response = await fetch(
    `http://localhost:8000/api/questoesTema?id=${temaId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  )

  const data = await response.json()
  const conjuntos: ConjuntoFormatado[] = []

  Object.values(data).forEach((conjunto: any) => {
    const questoes = Object.keys(conjunto)
      .filter(
        key =>
          key.startsWith('questao') &&
          typeof conjunto[key] === 'object' &&
          conjunto[key].questao // 👈 garante que é questão válida
      )
      .map(key => conjunto[key])

    conjuntos.push({
      id: conjunto.id,
      questoes,
    })
  })

  return conjuntos
}


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        avatarId,
        temaId,
        signIn,
        signUp,
        signOut,
        updateAvatar,
        createTema,
        listarTemas,
        setTemaAtual,
        listaConjuntos
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
