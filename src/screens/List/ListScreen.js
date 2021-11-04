import React, { useEffect } from 'react';

import { FlatList, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import ListItem from './ListItem';

const LIST_AUTO_UPDATE_RATE = 60 * 1000;
const LIST_USER_UPDATE_RATE = 15 * 1000;

/**
 * Экран со списком ивентов (стили не вынес потому что их мало). Ошибка загрузки данных не обработана. Можно обработать
 * используя подключенный @rematch/loading который вернет ошибку
 * @param props
 * @return {JSX.Element}
 * @constructor
 */

function ListScreen(props) {
  const isListLoading = useSelector({ loading }) => loading?.models?.list);
  const list = useSelector(({ list }) => list?.list);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  let lastUpdate = Date.now();

  /**
   * При маунте компонента грузим список и создаем интервал который с LIST_AUTO_UPDATE_RATE обновляет список
   */

  useEffect(() => {
    dispatch.list.loadList();

    const updater = setInterval(() => {
      if (props.navigation.isFocused()) {
        dispatch.list.loadList();
        lastUpdate = Date.now();
      }
    }, LIST_AUTO_UPDATE_RATE);

    return () => clearInterval(updater);
  }, []);

  /**
   * Обновляем руками список если с последнего обновления прошло LIST_USER_UPDATE_RATE мс
   */
  const handleRefresh = () => {
    if (Date.now() - lastUpdate > LIST_USER_UPDATE_RATE) {
      dispatch.list.loadList();
      lastUpdate = Date.now();
    }
  };

  return (
    <View
      style={styles.blockStyle}>
      <FlatList
        ListEmptyComponent={
          <View
            style={styles.emptyStyle}>
            <Text>No Events</Text>
          </View>
        }
        data={list}
        keyExtractor={item => item.id}
        refreshing={isListLoading}
        renderItem={({ item }) => <ListItem item={item} />}
        style={{ flex: 1 }}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

export default ListScreen;

const styles = StyleSheet.create({
  blockStyle: {
    backgroundColor: colors.background,
    flex: 1,
    paddingVertical: 8,
  },
  emptyStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})