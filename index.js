/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/screens';


const Application = () => {
  return (
      <App />
  );
};

AppRegistry.registerComponent(appName, () => () => <Application />);
