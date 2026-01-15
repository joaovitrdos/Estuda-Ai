import { NavigationContainer, TabRouter } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../../src/contexts/AuthContexts'
import StackRoutes from './stack.routes'
import StackAuthRoutes from './stack.auth.routes'
import Loading from '../../src/components/Loading'
import LoginScreen from '../../src/screens/auth/LoginScreen'
import RegisterScreen from '../../src/screens/auth/RegisterScreen'
import ProfileScreen from '../../src/screens/ProfileScreen'
import ResetPasswordScreen from '../../src/screens/ResetPasswordScreen'
import ResetUserPasswordScreen from '../../src/screens/auth/ResetUserPasswordScreen'

export function RootNavigator() {
  const { token, user, loading } = useContext(AuthContext)

  if (loading || (token && !user)) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {/* {token && user ? <StackAuthRoutes /> : <StackRoutes />} */}
      <StackAuthRoutes />
    </NavigationContainer>
  )
}
