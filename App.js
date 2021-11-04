import React from 'react';

import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';

import ScreensStack from './src/screens';
import {store} from './src/store';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    'backgroundColor': isDarkMode ?
Colors.darker :
Colors.lighter,
    'flex': 1,
  };
  return (
      <Provider store={store}>
          <PaperProvider>
              <SafeAreaView style={backgroundStyle}>
                  <StatusBar
                      barStyle={isDarkMode ?
'light-content' :
'dark-content'}
                  />

                  <ScreensStack />
              </SafeAreaView>
          </PaperProvider>
      </Provider>
  );
};

export default App;
