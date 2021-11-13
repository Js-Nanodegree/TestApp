/* eslint-disable react/no-array-index-key */
/* eslint-disable object-property-newline */
import React, {useCallback} from 'react';

import {useRoute} from '@react-navigation/native';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Title, useTheme} from 'react-native-paper';
import {iItem} from 'src/screens/Item/ItemRow';

import {CommitSelect} from './CommitSelect';
import {data} from './data';
import ItemRow from './ItemRow';

interface iActor{
    display_login:string;
    avatar_url:string;
    url:string;
}

interface iRepo{
    url:string
}

interface iParamActor{
    actor:iActor;
    repo:iRepo;
}

const ctxSetup = ({actor, repo}:iParamActor) => ({
    'repoUrl': repo.url,
    'title': actor?.display_login,
    'uri': actor?.avatar_url,
    'userUrl': actor.url,
});


function ItemScreen() {
    const route=useRoute<any>();
    const {colors} = useTheme();

    const ctx = ctxSetup(route.params?.item);

    const handlePress = useCallback(async () => {
        await Linking.openURL(ctx.userUrl);
    }, [ctx.userUrl]);

    const onPress = () => Linking.openURL(ctx.userUrl);
    const repoPush = {'item': route.params?.item, ...data};

    return (
        <View style={[styles.container, {'backgroundColor': colors.background}]}>
            <View style={styles.headContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Title>
                        {ctx.title}
                    </Title>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePress}>
                    <React.Suspense fallback={View}>
                        <Image
                            source={{'uri': ctx.uri}}
                            style={styles.image}
                        />
                    </React.Suspense>
                </TouchableOpacity>
            </View>

            {repoPush.itemRow().map((value:any, index: number) => (
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
                {repoPush.pushRepo().map((value:iItem, index: number) => {
                    const keys = Object.keys(value);

                    if (keys.includes('commits')) {
                        return value?.commits?.map((itemMap:any, idx: number) => (
                            <View
                                key={`${idx}_item_commit`}
                            >
                                <React.Suspense fallback={View}>
                                    <CommitSelect
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
                        </View>);
                })}
            </View>
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

export default React.memo(ItemScreen);
