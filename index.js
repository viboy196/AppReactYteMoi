/**
 * @format
 */
import React from 'react';

import {AppRegistry} from 'react-native';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Welcome from './src/screens/Welcome';
import Test from './src/screens/test';
import App from './src/navigation/App';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => <App />);
