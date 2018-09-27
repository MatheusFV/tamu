import React from 'react';
import SplashScreen from './src/containers/SplashScreen.js'
import MessageScreen from './src/containers/MessageScreen.js'

import {
    createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
    Home: {screen: SplashScreen},
    MessageScreen: {screen: MessageScreen, navigationOptions: {gesturesEnabled: false}}
})

export default App
