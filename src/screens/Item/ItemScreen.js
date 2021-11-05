/* eslint-disable react/no-array-index-key */
/* eslint-disable object-property-newline */
import React, {useCallback} from 'react';

import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Title, useTheme} from 'react-native-paper';

import {CommitSelect} from './CommitSelect';
import {data} from './data';
import ItemRow from './ItemRow';

function ItemScreen({route}) {
  const {item} = route.params;
  const {colors} = useTheme();

  const userUrl = item.actor.url;

  const handlePress = useCallback(async () => {
    await Linking.openURL(userUrl);
  }, [userUrl]);

  const onPress = () => Linking.openURL(item.repo.url);

  const title = item?.actor?.display_login;
  const uri = {'uri': item?.actor?.avatar_url};
  const repoPush = {item, ...data};

  return (
      <View style={[styles.container, {'backgroundColor': colors.background}]}>
          <View style={styles.headContainer}>
              <TouchableOpacity onPress={onPress}>
                  <Title>
                      {title}
                  </Title>
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePress}>
                  <React.Suspense fallback={View}>
                      <Image
                          source={uri}
                          style={styles.image}
                      />
                  </React.Suspense>
              </TouchableOpacity>
          </View>

          {repoPush.itemRow().map((value, index) => (
              <View
                  key={index}
              >
                  <React.Suspense fallback={View}>
                      <ItemRow
                          key={index}
                          {...value}
                      />
                  </React.Suspense>
              </View>
          ))}

          <View>
              {repoPush.pushRepo().map((value, index) => {
          const keys = Object.keys(value);

          if (keys.includes('commits')) {
            return value?.commits?.map((itemMap, idx) => (
                <View
                    key={`${idx}_item_commit`}
                >
                    <React.Suspense fallback={View}>
                        <CommitSelect
                            idx={idx}
                            item={itemMap}
                        />
                    </React.Suspense>
                </View>
            ));
          }

          return (
              <View key={`${index}_value`}>
                  <React.Suspense fallback={View}>
                      <ItemRow
                          {...value}
                      />
                  </React.Suspense>
              </View>)
            })}
          </View>
      </View>
  );
}

/*
 * Не обрабатываю случай когда может быть несколько ивентов
 * В продакшен коде этот кусок я бы вынес в отдельные компоненты
 * которые какой нибудь логикой
 * например с помощью switch выбирались как отрисоваться
 */

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

export default React.memo(ItemScreen);
