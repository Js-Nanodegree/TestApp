/* eslint-disable no-invalid-this */
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import route from 'src/routes';

/*
 * Компонент отрисовки Итема для списка.
 * Не вынес в папку компонентов потому что это не общий компонент
 * @param item
 * @return {JSX.Element}
 * @constructor
 */

/**
 * Контекс лучше собирать вне отображения страницы а прирендеренге
 */

interface IActor {
  display_login?: string;
  avatar_url?:string;
}

export interface iData {
  type?: string;
  actor?: IActor;
}

interface iListScreen {
  item: iData;
  idx?: number;
}


const ctxUpdate =({type, actor}:iData)=> ({
  'description': `Make: ${type || ''}`,
  'title': `Author: ${actor?.display_login || ''}`,
  'uri': actor?.avatar_url ||'',
});

const ListItem = ({item}: iListScreen) => {
  const navigation = useNavigation<any>();

  const ctx = Object.assign( ctxUpdate(item), {
    'onPress': () => navigation.navigate(route.item, {item}),
  });

  const leftImage = React.useCallback(
    () => {
      const uri = ctx['uri'];

      return (
        <React.Suspense
          fallback={styles.ItemStyle}
        >
          <Image
            source={{uri}}
            style={styles.ItemStyle}
          />
        </React.Suspense>);
    },
    [item],
  );

  return (
    <List.Item
      left={leftImage}
      {...ctx}
    />
  );
};

export default React.memo(ListItem);


const styles = StyleSheet.create({
  'ItemStyle': {
    'borderRadius': 22,
    'height': 44,
    'width': 44,
  },
});
