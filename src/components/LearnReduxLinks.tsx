/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// @ts-ignore
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const links = [
  {
    'description': 'JavaScript library for building user interfaces',
    'link': 'https://reactjs.org/',
    'title': 'React',
  },
  {
    'description': 'A Predictable State Container for JS Apps',
    'link': 'https://redux.js.org/',
    'title': 'Redux',
  },
  {
    'description':
      'The official, opinionated, batteries-included toolset for efficient Redux development',
    'link': 'https://redux-toolkit.js.org/',
    'title': 'Redux Toolkit',
  },
  {
    'description': 'Official React bindings for Redux',
    'link': 'https://react-redux.js.org',
    'title': 'React Redux',
  },
];

const LinkList = () => (
  <View style={styles.container}>
    {links.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <View style={styles.separator} />
          <TouchableOpacity
            accessibilityRole={'button'}
            style={styles.linkContainer}
            onPress={() => openURLInBrowser(item.link)}>
            <Text style={styles.link}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        </React.Fragment>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  'container': {
    'marginTop': 32,
    'paddingHorizontal': 24,
  },
  'description': {
    'color': Colors.dark,
    'flex': 3,
    'fontSize': 18,
    'fontWeight': '400',
    'paddingVertical': 16,
  },
  'link': {
    'color': Colors.primary,
    'flex': 2,
    'fontSize': 18,
    'fontWeight': '400',
  },
  'linkContainer': {
    'alignItems': 'center',
    'flexDirection': 'row',
    'flexWrap': 'wrap',
    'justifyContent': 'space-between',
    'paddingVertical': 8,
  },
  'separator': {
    'backgroundColor': Colors.light,
    'height': 1,
  },
});

export default LinkList;
