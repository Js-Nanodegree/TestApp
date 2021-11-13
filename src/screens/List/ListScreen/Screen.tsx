/* eslint-disable import/named */
/* eslint-disable no-param-reassign */
import React from 'react';

import {FlatList, View, Text, StyleSheet, RefreshControl} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {iData} from 'src/screens/List/ListItem';

import ListItem from '../ListItem';

const ITEM_HEIGHT = 100;

interface iList {
    handleRefresh: () => void;
    list: iData[];
    time: number;
    error: boolean | string;
    loading: boolean;
    message: string
}

interface iRender {
    item: iData;
    index: number;
}

export function Screen({handleRefresh, list, error, loading, message, time}: iList) {
    const {colors} = useTheme();
    const ref = React.useRef(null);
    const insets = useSafeAreaInsets();
    let errStr = 'No Events';
    if (message) {
        errStr = message;
    }

    console.log();

    const EmptyList = () => (
        <React.Suspense fallback={View}>
            <View style={styles.emptyStyle}>
                <Text>
                    {errStr}
                </Text>
            </View>
        </React.Suspense>
    );

    if (!Array.isArray(list)) {
        list = [];
    }

    const RenderItem = React.useCallback(({item, index}: iRender) => (<ListItem idx={index} item={item} />), [list]);

    const GetItemLayout = React.useCallback((_data, index: number) => (
        {
            index,
            'length': ITEM_HEIGHT,
            'offset': ITEM_HEIGHT * index,
        }
    ), [list]);

    const Message = () => (
        <Text>
            {errStr}
        </Text>
    );

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
                            handleRefresh();
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
