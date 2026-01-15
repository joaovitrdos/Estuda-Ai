import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../../src/screens/auth/LoginScreen";
import RegisterScreen from "../../src/screens/auth/RegisterScreen";
import ResetUserPasswordScreen from '../../src/screens/auth/ResetUserPasswordScreen';
import SendEmailScreen from '../../src/screens/auth/SendEmailScreen';

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
      <Stack.Screen name="sendemail" component={SendEmailScreen} />
      <Stack.Screen name="resetuserpasswordscreen" component={ResetUserPasswordScreen} />
    </Stack.Navigator>
  );
}

