import React from 'react';
import * as eva from '@eva-design/eva';
import {StatusBar} from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {AppNavigator, TabNavigator} from './routes/navigator';
import { default as theme } from './theme/theme.json';

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme}}>
            <StatusBar
                backgroundColor="#000"
                barStyle="light-content"
            />
            <AppNavigator/>
        </ApplicationProvider>
    </>
);