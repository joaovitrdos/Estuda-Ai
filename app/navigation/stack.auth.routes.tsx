import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "../../src/screens/ProfileScreen";
import OptionsScreen from "../../src/screens/OptionsScreen";
import SobreScreen from "../../src/screens/SobreScreen";
import ConjuntoScreen from "../../src/screens/ConjuntoScreen";
import TabRoutes from './tab.routes';
import QuestionsScreen from '../../src/screens/QuestionsScreen';
import ResetNewPasswordScreen from '../../src/screens/ResetPasswordScreen';
import ResetPasswordScreen from '../../src/screens/ResetPasswordScreen';


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
      <Stack.Screen name="questions" component={QuestionsScreen} />
      <Stack.Screen name="conjunto" component={ConjuntoScreen} />
      <Stack.Screen name="options" component={OptionsScreen} />
      <Stack.Screen name="sobre" component={SobreScreen} />
      <Stack.Screen name="resetpassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

