import React from 'react';

import {Linking, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

/**
 * Компонент отрисовки пункта на экране Итема
 * Добавлен функционал перехода по приходящему URL
 * (Идея с открытием почты при нажатии на емэйл)
 * @param title
 * @param desc
 * @param descLinkable
 * @return {JSX.Element}
 * @constructor
 */

function ItemRow({title, desc, descLinkable}) {
  const {colors} = useTheme();

  let textAddLink = {
      'disable': true,
      'onPress': () => null,
    }
  if (title.includes('Email')) {
    textAddLink = {
      'disabled': false,
      'onPress': () => Linking.openURL(`mailto:${desc}`),
    }
  }

  const description = desc || `No ${title} data`

  return (
      <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, {'color': colors.primary}]}>
              {`${title}: `}
          </Text>

          <Text
              style={[styles.sectionDescription]}
              {...textAddLink}
          >
              {description}
          </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  'sectionContainer': {
    'flexDirection': 'row',
    'paddingTop': 16,
  },
  'sectionDescription': {
    'fontSize': 16,
    'fontWeight': '400',
    'width': 300,
  },
  'sectionTitle': {
    'fontSize': 16,
    'fontWeight': 'bold',
  },
});

export default React.memo(ItemRow);
