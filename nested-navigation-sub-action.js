import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {
    SafeAreaView,
    createStackNavigator,
    createSwitchNavigator,
    NavigationActions,
    StackActions
} from 'react-navigation';
import {ReactNavigationRoutesDisplay} from "./lib/react-navigation-util/react-navigation-routes-display.component";

global.NavigationActions = NavigationActions;
global.StackActions = StackActions;

const DummyScreen = ({routeName, navigationActionsMap, navigation, style}) => {
    global.navigation = navigation;
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
            <ReactNavigationRoutesDisplay
                navigationState={global.rootNavigator ? global.rootNavigator.state.nav : {routes: []}}/>
        </SafeAreaView>
    );
};

const createDummyScreen = (routeName, navigationActionsMap) => {
    const BoundDummyScreen = (props) =>
        DummyScreen({...props, routeName, navigationActionsMap});
    return BoundDummyScreen;
};

const toLogin = NavigationActions.navigate({routeName: 'Login'});
const toFirst = NavigationActions.navigate({routeName: 'First'});
const toFirst1 = NavigationActions.navigate({routeName: 'First1'});
const toFirst2 = NavigationActions.navigate({routeName: 'First2'});
const toSecond1 = NavigationActions.navigate({routeName: 'Second1'});
const toSecond2 = NavigationActions.navigate({routeName: 'Second2'});
const toFirstChild1 = NavigationActions.navigate({
    routeName: 'First',
    action: NavigationActions.navigate({routeName: 'First1'})
});
const toFirstChild2 = NavigationActions.navigate({
    routeName: 'First',
    action: NavigationActions.navigate({routeName: 'First2'})
});
const toSecondChild1 = NavigationActions.navigate({
    routeName: 'Second',
    action: NavigationActions.navigate({routeName: 'Second1'})
});
const toSecondChild2 = NavigationActions.navigate({
    routeName: 'Second',
    action: NavigationActions.navigate({routeName: 'Second2'})
});

global.toFirst = toFirst;
global.toFirst1 = toFirst1;
global.toFirst2 = toFirst2;
global.toSecond1 = toSecond1;
global.toSecond2 = toSecond2;
global.toFirstChild1 = toFirstChild1;
global.toFirstChild2 = toFirstChild2;
global.toSecondChild1 = toSecondChild1;
global.toSecondChild2 = toSecondChild2;

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
                    Second2: createDummyScreen('Second2', {toFirstChild1, toFirst1 }),
                }
            ),
        }
    )
});


const runSubAction = () => {
    // expected: `navigation.dispatch(toFirstChild1)` navigates to 'First1'.
    // actual: navigates to 'First2'. Seems to find 'First' but not run `action`
    navigation.dispatch(toFirst2);
    navigation.dispatch(toSecond2);
    navigation.dispatch(toFirstChild1);
};

global.runSubAction = runSubAction;

const exposeGlobalNavigator = (navigator) => {
    global.rootNavigator = navigator;
    global.rootNavigation = navigator._navigation;
};
export const ExposedRootNavigator = (props) => {
    return <RootNavigator
        ref={exposeGlobalNavigator}
        {...props}
    />
};