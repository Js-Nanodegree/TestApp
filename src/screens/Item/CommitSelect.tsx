/* eslint-disable react/no-array-index-key */
import React from 'react';

import {View, StyleSheet} from 'react-native';

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

interface iCommit{
    item:any
}

export const CommitSelect = ({item}:iCommit) => (
    <View
        style={styles.topLine}
    >
        {item.map((commit:any, idx: number) => (
            <View
                key={`${idx}_commit`}
            >
                <React.Suspense fallback={View}>
                    <ItemRow
                        {...commit}
                    />
                </React.Suspense>
            </View>
        ))}
    </View>
);


const styles = StyleSheet.create({
  'topLine': {
    'borderTopWidth': 1,
    'marginTop': 20,
  },
});
