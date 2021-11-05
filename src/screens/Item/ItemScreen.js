import React, {useCallback} from 'react';

import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Title, useTheme} from 'react-native-paper';

import ItemRow from './ItemRow';

/**
 * Экран просмотра Итема.
 * Добавлен функционал нажатия на иконку и имя юзера
 * чтобы перейти на более детальную информацию
 * (Из апи). В продакшен вынес бы в отдельный компонент headContainer,
 * и сделал бы компоненты из ItemRow
 * @param route
 * @param navigation
 * @return {JSX.Element}
 * @constructor
 */
function ItemScreen({route, navigation}) {
  const {item} = route.params;
  const {colors} = useTheme();

  const userUrl = item.actor.url;

  const handlePress = useCallback(
    async () => {
      await Linking.openURL(userUrl);
    },
    [userUrl],
  );

  const onPress = () => Linking.openURL(item.repo.url);

  return (
      <View style={[styles.container, {'backgroundColor': colors.background}]}>
          <View style={styles.headContainer}>
              <TouchableOpacity onPress={onPress}>
                  <Title>
                      {item?.actor?.display_login}
                  </Title>
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePress}>
                  <Image
                      source={{'uri': item?.actor?.avatar_url}}
                      style={styles.image}
                  />
              </TouchableOpacity>
          </View>

          <ItemRow
              desc={item?.repo.name}
              title="Repo"
          />

          <ItemRow
              desc={item?.type}
              title="Make"
          />

          <ItemRow
              desc={item?.created_at}
              title="Date"
          />

          {

        /*
         * Не обрабатываю случай когда может быть несколько ивентов
         * В продакшен коде этот кусок я бы вынес в отдельные компоненты
         * которые какой нибудь логикой
         * например с помощью switch выбирались как отрисоваться
         */
        item.type === 'PushEvent' ?
            <View>
                <ItemRow
                    desc={item.payload.push_id}
                    title="Push ID"
                />

                <ItemRow
                    desc={item.payload?.commits?.[0]?.author?.name}
                    title="Author"
                />

                <ItemRow
                    descLinkable
                    desc={item.payload?.commits?.[0]?.author?.email}
                    title="Author Email"
                />

                <ItemRow
                    desc={item.payload?.commits?.[0].message}
                    title="Message"
                />
            </View> :
            <View />

      }
      </View>
  );
}

const styles = StyleSheet.create({
  'container': {
    'flex': 1,
    'padding': 16,
  },
  'headContainer': {
    'alignItems': 'center',
    'flexDirection': 'row',
    'justifyContent': 'space-between',
  },
  'image': {
    'height': 64,
    'width': 64,
  },
});

export default ItemScreen;
