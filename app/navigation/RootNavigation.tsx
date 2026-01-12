import { NavigationContainer } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../../src/contexts/AuthContexts'
import StackRoutes from './stack.routes'
import StackAuthRoutes from './stack.auth.routes'
import Loading from '../../src/components/Loading'

export function RootNavigator() {
  const { token, user, loading } = useContext(AuthContext)

  if (loading || (token && !user)) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {token && user ? <StackAuthRoutes /> : <StackRoutes />}
    </NavigationContainer>
  )
}
