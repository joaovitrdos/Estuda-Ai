import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../src/screens/ProfileScreen";
import OptionsScreen from "../../src/screens/OptionsScreen";
import SobreScreen from "../../src/screens/SobreScreen";
import ConjuntoScreen from "../../src/screens/ConjuntoScreen";

const Stackk = createNativeStackNavigator();

export default function AuthStackUser() {
  return (
    <Stackk.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Stackk.Screen name="profilescreen" component={ProfileScreen} />
      <Stackk.Screen name="optionsscreen" component={OptionsScreen} />
      <Stackk.Screen name="sobrescreen" component={SobreScreen} />
      <Stackk.Screen name="conjuntiscreen" component={ConjuntoScreen} />
    </Stackk.Navigator>
  );
}

