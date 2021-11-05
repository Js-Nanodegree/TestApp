/* eslint-disable no-param-reassign */
/* eslint-disable react/no-multi-comp */
import React from 'react';

import {FlatList, View, StyleSheet, RefreshControl} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import ListItem from '../ListItem';

export function Screen({handleRefresh, list, error, loading, time}) {
    const {colors} = useTheme();
    const ref = React.useRef(null)

    const EmptyList = () => (
        <React.Suspense fallback={View}>
            <View style={styles.emptyStyle}>
                <Text>
                    {error || 'No Events'}
                </Text>
            </View>
        </React.Suspense>
    );

    if (!Array.isArray(list)) {
        list = []
    }

    const RenderItem = React.useCallback(({item}) => (<ListItem item={item} />), [list]);

    const Message = () => (
        <Text>
            {error}
        </Text>
    )

    return (
        <View
            style={[{'backgroundColor': colors.background}, styles.blockStyle]}
        >
            <FlatList
                ListEmptyComponent={EmptyList}
                ListHeaderComponent={Message}
                contentContainerStyle={styles.stylesFlex}
                data={list}
                ref={ref}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => {
                            handleRefresh()
                        }}
                    />
                }
                renderItem={RenderItem}
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
