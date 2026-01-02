import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image } from 'react-native';;
import HomeScreen from '../../src/screens/HomeScreen';
import OptionsScreen  from '../../src/screens/OptionsScreen';
import { Theme } from '../../src/styles/themes/themes';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Theme.colors.background,
                    height: 60,
                    position: 'absolute',
                    bottom: 0,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderRadius: 10,
                    borderTopWidth: 1,
                    borderColor: Theme.colors.border,
                    elevation: 10,
                },
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.iconFocused : styles.icon}>
                            <Image
                                source={require('../../src/styles/icons/home.png')}
                                style={styles.image}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="options"
                component={OptionsScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.iconFocused : styles.icon}>
                            <Image
                                source={require('../../src/styles/icons/options.png')}
                                style={styles.image}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {

    },
    iconFocused: {
        width: 44,
        height: 44,
        borderRadius: 10,
        borderColor: Theme.colors.blue,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 23,
        height: 23,
    },
});
