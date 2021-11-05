import React from 'react';

import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import ScreensStack from './src/screens';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    'backgroundColor': isDarkMode ?
        Colors.darker :
        Colors.lighter,
    'flex': 1,
  };
  return (
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
  );
};

export default App;
