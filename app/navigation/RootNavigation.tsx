import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../src/contexts/AuthContexts';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import Loading from '../../src/components/Loading';
import ProfileScreen from '../../src/screens/ProfileScreen';
import HomeScreen from '../../src/screens/HomeScreen';

export function RootNavigator() {
  const { token, user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (token && !user) {
    }
  }, [token]);

  if (loading || (token && !user)) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {/* {token && user ? <AppTabs /> : <AuthStack />} */}
      <HomeScreen />
    </NavigationContainer>
  );
}
