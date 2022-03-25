import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddUserScreen } from '../views/add_customer';
import { ViewUserScreen } from '../views/view_customer';

const { Navigator, Screen } = createStackNavigator();



const HomeNavigator = ({route}) => (
    <Navigator>
        <Screen name='viewUser' component={ViewUserScreen} options={{ title: 'Customers' }}/>
        <Screen name='addUser' component={ AddUserScreen } options={{ title: 'Add Customer'}}/>
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer independent={true}>
        <HomeNavigator/>
    </NavigationContainer>
);