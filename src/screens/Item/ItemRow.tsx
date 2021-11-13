/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import {Linking, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

export interface iItem{
  commits: any;
  title:string[];
  desc?:string;
}

function ItemRow({title, desc}:iItem) {
  const {colors} = useTheme();

  let textAddLink = {
      'description': desc||`No ${title} data`,
      'disabled': true,
      'onPress': () => null,
    };
  if (title.includes('Email')) {
    textAddLink = {
      'description': desc||`No ${title} data`,
      'disabled': false,
      'onPress': () =>{
        if (desc) {
          Linking.openURL(`mailto:${desc}`);
        }
        return null;
      },
    };
  }

  return (
      <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, {'color': colors.primary}]}>
              {`${title}: `}
          </Text>

          <Text
              style={[styles.sectionDescription]}
              {...textAddLink}
          >
              {textAddLink.description}
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
