import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  LoginScreen  from "../../src/screens/auth/LoginScreen";
import  RegisterScreen  from "../../src/screens/auth/RegisterScreen";
import  ProfileScreen from "../../src/screens/ProfileScreen";
import  AppTabs from "./AppTabs";
import  OptionsScreen  from "../../src/screens/OptionsScreen";
import  SobreScreen  from "../../src/screens/SobreScreen";
import ConjuntoScreen from "../../src/screens/ConjuntoScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >  
      <Stack.Screen name="tabs" component={AppTabs} />
      <Stack.Screen name="optionsscreen" component={OptionsScreen} />
      <Stack.Screen name="profilescreen" component={ProfileScreen} />
      <Stack.Screen name="sobrescreen" component={SobreScreen} />
      <Stack.Screen name="loginscreen" component={LoginScreen} />
      <Stack.Screen name="registerscreen" component={RegisterScreen} />
      <Stack.Screen name="conjuntiscreen" component={ConjuntoScreen} />
    </Stack.Navigator>
  );
}
 
