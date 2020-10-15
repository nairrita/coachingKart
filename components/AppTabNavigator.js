import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export const AppTabNavigator = createBottomTabNavigator({
    Login: { screen: LoginScreen,
        navigationOptions: {
            // tabBarIcon: <Image source={}  />,
            tabBarLabel: 'Login'
        }
    },
    Signup: { screen: SignupScreen,
        navigationOptions: {
            // tabBarIcon: <Image source={} />,
            tabBarLabel: 'Signup'
        }
    },
}) 