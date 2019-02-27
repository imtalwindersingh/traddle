
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Alert,
  InteractionManager,
  TouchableOpacity,
  Linking,
  Navigator, 
  NativeModules,
  AsyncStorage,
  BackHandler, 
  StatusBar
} from 'react-native';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import { 
  createSwitchNavigator,
  createStackNavigator, 
  TabNavigator, 
  createDrawerNavigator,
  createBottomTabNavigator

} from 'react-navigation'; 

import LoginPage from '../container/Login/LoginMain';
import RegGetOTP from '../components/Registration/RegGetOTP';
import RegCheckOTP from '../components/Registration/RegCheckOTP';


import RegistrationPage from '../container/Registration/Registration';
import Type from '../components/Registration/OTPPage';
import Trader from '../container/Registration/Trader';
import RegistrationTraderVerify from '../container/Registration/RegistrationTraderVerify';

import ForgotPasswordPage from '../container/Login/ForgotPassword';
import CheckOTP from '../components/Login/forgotPassword/CheckOTP';
import ResetPassword from '../components/Login/forgotPassword/ResetPassword';
import ComoditySelection from '../components/Registration/ComoditySelection';
import Form1 from '../components/Registration/Form1';

const LoginStack = createStackNavigator({

    LoginPage: {
      screen: LoginPage,
      navigationOptions: { header: null } //to hide the header
    },
    RegGetOTP: {
      screen: RegGetOTP,
      navigationOptions: { header: null } //to hide the header
    },
    RegCheckOTP: {
      screen: RegCheckOTP,
      navigationOptions: { header: null } //to hide the header
    },

    // regis Module

    RegistrationPage: {
        screen: RegistrationPage,
        navigationOptions: { header: null } //to hide the header
      },
      Type:{
        screen: Type,
        navigationOptions: { header: null } //to hide the header
      },
      Trader: {
        screen: Trader,
        navigationOptions: { header: null } //to hide the header
      },

      RegistrationTraderVerify: {
        screen: RegistrationTraderVerify,
        navigationOptions: { header: null } //to hide the header
      },
      ComoditySelection:{
         screen: ComoditySelection,
        navigationOptions: { header: null } //to hide the header
      },


// regi form for tendar
      Form1:{
        screen: Form1,
        navigationOptions: { header: null }
      },

      // forgot module
      ForgotPasswordPage:{
        screen: ForgotPasswordPage,
        navigationOptions: { header: null } //to hide the header
      },
      CheckOTP:{
        screen: CheckOTP,
        navigationOptions: { header: null } //to hide the header
      },
      ResetPassword:{
          screen: ResetPassword,
          navigationOptions: { header: null } //to hide the header
      }




    },
    {
      initialRouteName:'LoginPage',
    }
  );
export default LoginStack;