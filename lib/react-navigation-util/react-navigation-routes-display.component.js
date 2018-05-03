import React from "react";
import { Text } from "react-native";
import {
    getAllRoutePaths,
    getCurrentRoutePath, isRoutePathEqual
} from "./react-navigation-state";

export const ReactNavigationRoutesDisplay = ({ navigationState }) => {
  const currentRoutePath = getCurrentRoutePath(navigationState);
  return getAllRoutePaths(navigationState).map((routePath, index) => {
    return (
      <Text key={index} style={{ fontSize: 10 }}>
        {routePath.map(({ routeName, key }, index) => {
            const isCurrentRoutePath = isRoutePathEqual(currentRoutePath, routePath);
            return (
            <Text
                key={key}
                // style={{ fontSize: 10, fontWeight: isCurrentRoutePath ? 'bold' : 'normal' }}
            >
              {index > 0 && "."}
              {routeName}
              {routeName !== key && (
                <Text style={{ fontSize: 8, color: "grey" }}>{key}</Text>
              )}
            </Text>
          );
        })}
      </Text>
    );
  });
};
