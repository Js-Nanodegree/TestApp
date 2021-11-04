import * as React from 'react';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

import ItemScreen from './Item/ItemScreen';
import ListScreen from './List/ListScreen';

const Stack = createNativeStackNavigator();

/**
 * Основной навигатор с путями
 * @return {JSX.Element}
 * @constructor
 */

function ScreensStack() {
  const THEME_COLOR = useColorScheme();

  let scheme = DefaultTheme
  if (THEME_COLOR === 'dark') {
    scheme = DarkTheme
  }

  return (
      <NavigationContainer
          theme={scheme}
      >
          <Stack.Navigator initialRouteName="ListScreen">
              <Stack.Screen
                  component={ListScreen}
                  name="ListScreen"
                  options={{'title': 'Events'}}
              />

              <Stack.Screen
                  component={ItemScreen}
                  name="ItemScreen"
                  options={({route}) => ({'title': `Event ID: ${route.params.item.id}`})}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default ScreensStack;
