/* eslint-disable import/named */
/* eslint-disable no-param-reassign */
import React from 'react';

import {FlatList, View, StyleSheet, RefreshControl} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ListItem from '../ListItem';

const ITEM_HEIGHT = 100

export function Screen({handleRefresh, list, error, loading, time}) {
    const {colors} = useTheme();
    const ref = React.useRef(null)
    const insets = useSafeAreaInsets()

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

    const GetItemLayout = React.useCallback((data, index) => (
        {
            index,
            'length': ITEM_HEIGHT,
            'offset': ITEM_HEIGHT * index,
        }
    ), [list])

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
                removeClippedSubviews
                ListEmptyComponent={EmptyList}
                ListHeaderComponent={Message}
                contentContainerStyle={[styles.stylesFlex, {'marginBottom': insets.bottom}]}
                data={list}
                extraData={list}
                getItemLayout={GetItemLayout}
                initialNumToRender={10}
                maxToRenderPerBatch={16}
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
                updateCellsBatchingPeriod={100}
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
