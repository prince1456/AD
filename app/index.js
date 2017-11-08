import React, {Component} from 'react';
import { StyleSheet, Text,
   View, Image, Dimensions,
  } from 'react-native';
import * as firebase from 'firebase'
import { StackNavigator } from 'react-navigation'
import Home from './screens/Home'
import Login from './screens/Login'


const windowWidth = Dimensions.get('window').width

firebaseConfig = {
  apiKey: "AIzaSyDwOTHQ3Gri6wJTKsZF3Bm6Ws38lBaQ9Rk",
  databaseURL: "https://astro-d36e0.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)

const StackNavigatorConfigs = {
    headerMode: 'none',
}
const RouteConfigs = {

    Login: {screen: Login},
    Home: {screen: Home},
}

export default StackNavigator(RouteConfigs, StackNavigatorConfigs)