import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../../src/screens/auth/LoginScreen";
import RegisterScreen from "../../src/screens/auth/RegisterScreen";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="loginscreen" component={LoginScreen} />
      <Stack.Screen name="registerscreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

