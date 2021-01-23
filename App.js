import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';

import {View, Text} from 'react-native'
import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/Main'

import LandingScreen from './components/auth/Landing' 
import RegisterScreen from './components/auth/Register';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

//use enviornement variables
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3MFuvLM2ilrvQCNOKYac0Sj32dWYoL7I",
  authDomain: "insta-clone-2e29e.firebaseapp.com",
  projectId: "insta-clone-2e29e",
  storageBucket: "insta-clone-2e29e.appspot.com",
  messagingSenderId: "321594925963",
  appId: "1:321594925963:web:1e35c8e5bc72790f29c58e",
  measurementId: "G-39645PCM1Q"
};

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)

}

const Stack = createStackNavigator();  


export class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false, 
    }
  }
  componentDidMount () { 
    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
          this.setState({
            loggedIn: false,
            loaded: true,
          })
        }
        else { 
          this.setState({
            loggedIn: true, 
            loaded: true,
          })
        }
    })
  }
  render() {
    const { loggedIn, loaded} = this.state
    if(!loaded){
      return ( 
        <View> 
          <Text> Loading </Text>
        </View>
      )
    }
    if (!loggedIn) {
    return (
        <NavigationContainer>
          <Stack.Navigator initalRouteName = "Landing">
            <Stack.Screen name = "Landing" component = {LandingScreen} options = {{headerShown: false}} />
            <Stack.Screen name = "Register" component = {RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    );

  }
  return (
    <Provider store = {store}> 
    <MainScreen/>
    </Provider>
  )
}
}

export default App




