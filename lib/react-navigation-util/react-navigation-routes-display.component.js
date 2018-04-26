import React from 'react';
import { Text } from 'react-native';
import {getAllRoutePaths} from "./react-navigation-state";

export const ReactNavigationRoutesDisplay = ({ navigationState }) => {
    return getAllRoutePaths(navigationState).map((routePath, index) => {
        return (<Text key={index} style={{ fontSize: 10 }}>{
            routePath.map(({routeName, key}, index) =>
                <Text key={key}>{index > 0 && '.'}{routeName}{routeName !== key &&
                <Text style={{fontSize: 8, color: 'grey'}}>{key}</Text>}</Text>
            )
        }</Text>)
    });
};