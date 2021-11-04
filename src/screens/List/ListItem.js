import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

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

const ListItem = ({item}) => {
  const navigation = useNavigation();
  const ctx = {
    'description': `Make: ${item?.type}`,
    'onPress': () => navigation.navigate('ItemScreen', {item}),
    'title': `Author: ${item?.actor.display_login}`,
  };

  const leftImage = React.useCallback(
    () => {
      const uri = item.actor.avatar_url;

      return (
          <React.Suspense
              fallback={styles.ItemStyle}
          >
              <Image
                  source={{uri}}
                  style={styles.ItemStyle}
              />
          </React.Suspense>)
    },
    [item],
  )

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
