import React from 'react';
import { Text } from 'react-native';
import {getCurrentRoutePath, getAllRoutePaths, isRoutePathEqual} from "./react-navigation-state";

export const ReactNavigationRoutesDisplay = ({ navigationState }) => {
    const currentRoutePath = getCurrentRoutePath(navigationState);
    return getAllRoutePaths(navigationState).map((routePath, index) => {
        const isCurrentRoutePath = isRoutePathEqual(currentRoutePath, routePath);
        return (<Text key={index} style={{ fontSize: 10, fontWeight: isCurrentRoutePath ? 'bold' : 'normal' }}>{
            routePath.map(({routeName, key}, index) =>
                <Text key={key}>{index > 0 && '.'}{routeName}{routeName !== key &&
                <Text style={{fontSize: 8, color: 'grey'}}>{key}</Text>}</Text>
            )
        }</Text>)
    });
};