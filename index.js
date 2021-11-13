/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import {store} from './src/app/store';


const Application = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => () => <Application />);
