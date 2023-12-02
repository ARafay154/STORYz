import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREEN } from '../enums/AppEnums';
import { HomeScreen, SettingsScreen } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import { View } from 'react-native';

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { // Add styles to the tab bar
          height: 70,
          margin: 12,
          position: 'absolute',
          bottom: 0,
          borderRadius: 15,
          backgroundColor: 'black'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === SCREEN.HOME) {
            iconName = focused ? 'home' : 'home-outline'; // Use home and home-outline icons for HomeScreen
          } else if (route.name === SCREEN.SETTINGS) {
            iconName = focused ? 'settings' : 'settings-outline'; // Use settings and settings-outline icons for SettingsScreen
          }

          const backgroundColor = focused ? 'white' : '';
          return <View style={{ backgroundColor, width: 100, alignItems: 'center', padding: 8, borderRadius: 15 }}>
            <Ionicons name={iconName} size={40} color={focused ? 'black' : 'white'} />
          </View>;
        },
      })}>
      <Tab.Screen name={SCREEN.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
