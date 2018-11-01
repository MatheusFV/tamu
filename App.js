import React from 'react';
import SplashScreen from './src/containers/SplashScreen.js'
import MessageScreen from './src/containers/MessageScreen.js'

import { Provider } from "react-redux";
import store from "./store";

import {
    createStackNavigator,
} from 'react-navigation';

const AppNavigation = createStackNavigator({
    Home: {screen: SplashScreen},
    MessageScreen: {screen: MessageScreen, navigationOptions: {gesturesEnabled: false}}
})

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        )
    }
}
