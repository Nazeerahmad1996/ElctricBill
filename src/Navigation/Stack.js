import React from 'react';
import Home from '../Screen/Home';
import Counter from '../Screen/Counter';
import UserList from '../Screen/UserList';
import Configure from '../Screen/Configure';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function NavStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            headerMode={false}
            initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Counter" component={Counter} />
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name="Configure" component={Configure} />
        </Stack.Navigator>
    );
}

export default function AppContainer() {
    return (
        <NavigationContainer>
            <NavStack />
        </NavigationContainer>
    );
}