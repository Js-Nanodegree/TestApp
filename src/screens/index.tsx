/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import * as React from 'react';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, useColorScheme} from 'react-native';

import route from '../routes';

import ItemScreen from './Item/ItemScreen';
import ListScreen from './List/ListScreen';

const Stack = createNativeStackNavigator();

const title = {
  ItemScreen(id: number) {
    return `Event ID: ${id}`;
  },
  'ListScreen': 'Events',
};

function ScreensStack() {
  const THEME_COLOR = useColorScheme();

  let scheme = DefaultTheme;
  if (THEME_COLOR === 'dark') {
    scheme = DarkTheme;
  }

  return (
    <NavigationContainer
      theme={scheme}
    >
      <Stack.Navigator initialRouteName={route.initial}>
        <Stack.Screen
          component={ListScreen}
          name={route.initial}
          options={()=>({'title': title.ListScreen})}
        />

        <Stack.Screen
          component={ItemScreen}
          name={route.item}
          options={({'route': {'params': {item}}}:any) => ({'title': title.ItemScreen(item?.id)})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ScreensStack;
