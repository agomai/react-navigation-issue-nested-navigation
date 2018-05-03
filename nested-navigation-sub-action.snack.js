import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {
    SafeAreaView,
    createStackNavigator,
    createSwitchNavigator,
    NavigationActions
} from 'react-navigation';

const DummyScreen = ({routeName, navigationActionsMap, navigation, style}) => {
    return (
        <SafeAreaView style={[StyleSheet.absoluteFill, {backgroundColor: 'white'}, style]}>
            <Text style={{fontWeight: '800'}}>{routeName} ({navigation.state.routeName},{navigation.state.key})</Text>
            <View style={{flexDirection: 'row'}}>
                <Button title="back" onPress={() => navigation.goBack()}/>
                <Button title="back(null)" onPress={() => navigation.goBack(null)}/>
                <Button title="popToTop" onPress={() => navigation.popToTop()}/>
                <Button title="dismiss" onPress={() => navigation.dismiss()}/>
            </View>
            {!!navigationActionsMap &&
            Object.entries(navigationActionsMap).map(([name, navigationAction]) =>
                <Button key={name} title={name} onPress={() => navigation.dispatch(navigationAction)}/>
            )
            }
        </SafeAreaView>
    );
};

const createDummyScreen = (routeName, navigationActionsMap) => {
    const BoundDummyScreen = (props) =>
        DummyScreen({...props, routeName, navigationActionsMap});
    return BoundDummyScreen;
};

// expected navigation: Login (initial): First2 -> Second2 -> First1

const toLogin = NavigationActions.navigate({routeName: 'Login'});
const toFirst2 = NavigationActions.navigate({routeName: 'First2'});
const toSecond2 = NavigationActions.navigate({routeName: 'Second2'});
const toFirstChild1 = NavigationActions.navigate({
    routeName: 'First',
    action: NavigationActions.navigate({routeName: 'First1'})
});
// Second2 -> First1 works without sub-action
// const toFirst1 = NavigationActions.navigate({routeName: 'First1'});

export const RootNavigator = createSwitchNavigator({
    Login: createDummyScreen('Login', {toFirst2}),
    Main: createStackNavigator(
        {
            First: createStackNavigator(
                {
                    First1: createDummyScreen('First1', {toLogin}),
                    First2: createDummyScreen('First2', {toSecond2}),
                }
            ),
            Second: createStackNavigator(
                {
                    Second1: createDummyScreen('Second1'),
                    Second2: createDummyScreen('Second2', {toFirstChild1, /* toFirst1 */ }),
                }
            ),
        }
    )
});


export default props => {
    return <RootNavigator {...props} />;
};
