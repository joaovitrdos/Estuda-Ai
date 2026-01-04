import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../src/contexts/AuthContexts';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import Loading from '../../src/components/Loading';
import LoginScreen from '../../src/screens/auth/LoginScreen';
import ProfileScreen from '../../src/screens/ProfileScreen';
import RegisterScreen from '../../src/screens/auth/RegisterScreen';
import ConjuntoScreen from '../../src/screens/ConjuntoScreen';
import HomeScreen from '../../src/screens/HomeScreen';

export function RootNavigator() {
  const { user, loading } = useContext(AuthContext);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading || showLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
      {/* <LoginScreen /> */}
    </NavigationContainer>
  );
}
