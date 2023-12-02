import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREEN } from '../enums/AppEnums'
import { ForgotPasswordScreen, LoginScreen, SignUpScreen, SplashScreen, StoryScreen } from '../screens'
import BottomNavigation from './BottomNavigation'

const RootNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name={SCREEN.SPLASHSCREEN} component={SplashScreen} />
                <Stack.Screen name={SCREEN.LOGIN} component={LoginScreen} />
                <Stack.Screen name={SCREEN.FORGET_PASSWORD} component={ForgotPasswordScreen} />
                <Stack.Screen name={SCREEN.SIGNUP} component={SignUpScreen} />
                <Stack.Screen name={SCREEN.TAB_BAR} component={BottomNavigation}/>
                <Stack.Screen name={SCREEN.STORY} component={StoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation

const styles = StyleSheet.create({})