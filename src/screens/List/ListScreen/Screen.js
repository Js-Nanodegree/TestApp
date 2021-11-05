/* eslint-disable react/jsx-no-literals */
/* eslint-disable react/no-multi-comp */
import React from 'react';

import {FlatList, View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import ListItem from '../ListItem';

export function Screen({handleRefresh, list, isListLoading}) {
  const {colors} = useTheme();

  const EmptyList = () => (
      <React.Suspense fallback={View}>
          <View style={styles.emptyStyle}>
              <Text>
                  No Events
              </Text>
          </View>
      </React.Suspense>
  );

  const RenderItem = React.useCallback(({item}) => (<ListItem item={item} />), [list]);

  return (
      <View
          style={[{'backgroundColor': colors.background}, styles.blockStyle]}
      >
          <FlatList
              ListEmptyComponent={EmptyList}
              contentContainerStyle={styles.stylesFlex}
              data={list}
              refreshing={isListLoading}
              renderItem={RenderItem}
              onRefresh={handleRefresh}
          />
      </View>
  );
}


 const styles = StyleSheet.create({
  'blockStyle': {
    'flex': 1,
    'paddingVertical': 8,
  },
  'emptyStyle': {
    'alignItems': 'center',
    'flex': 1,
    'justifyContent': 'center',
  },
  'stylesFlex': {'flexGrow': 1},
});
