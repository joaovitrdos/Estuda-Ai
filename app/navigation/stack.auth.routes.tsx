import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "../../src/screens/ProfileScreen";
import OptionsScreen from "../../src/screens/OptionsScreen";
import SobreScreen from "../../src/screens/SobreScreen";
import ConjuntoScreen from "../../src/screens/ConjuntoScreen";
import TabRoutes from './tab.routes';
import LoginScreen from "../../src/screens/auth/LoginScreen";
import RegisterScreen from "../../src/screens/auth/RegisterScreen";

const Stack = createStackNavigator();

export default function StackAuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="tabroutes" component={TabRoutes} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="Conjunto" component={ConjuntoScreen} />
      <Stack.Screen name="options" component={OptionsScreen} />
      <Stack.Screen name="sobre" component={SobreScreen} />
      <Stack.Screen name="loginscreen" component={LoginScreen} />
      <Stack.Screen name="registerscreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

