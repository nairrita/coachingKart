
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import AddDataScreen from './screens/AddDataScreen';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import TeacherClasses from './screens/TeacherClasses'
import AddClasses from './screens/AddClasses';
import SearchClasses from './screens/SearchClasses'

import { AppTabNavigator } from './components/AppTabNavigator';

export default class App extends React.Component {
  render() {
    return(
        <AppContainer />
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Signup:{ screen: SignupScreen },
  AddData: { screen: AddDataScreen },
  TeacherClasses: { screen: TeacherClasses },
  AddClasses: { screen: AddClasses },
  SearchClasses: { screen: SearchClasses }
  // BottomTab: { screen: AppTabNavigator }
  
})

const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  
});
