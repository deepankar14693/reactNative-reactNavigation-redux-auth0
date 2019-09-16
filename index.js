/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import configurationStore from './src/store/configureStore';
import React from 'react';

const store = configurationStore();

const Root = () => (
   <Provider store={store}>
    <App />
  </Provider> 
)


AppRegistry.registerComponent(appName, () => Root);
