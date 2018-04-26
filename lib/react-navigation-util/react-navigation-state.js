// @flow

import type {NavigationState, NavigationStateRoute} from 'react-navigation';

const emptyArray = [];

type RouteElement = { routeName: string, key: string };
type RoutePath = Array<RouteElement>;

export const getCurrentRoutePath = (
    navigationState: NavigationState | NavigationStateRoute,
): RoutePath => {
    if (!navigationState) {
        return [];
    }
    const {routeName, key, routes, index} = navigationState;
    return [
        ...(routeName ? [{routeName, key}] : emptyArray),
        ...(routes ? getCurrentRoutePath(routes[index]) : emptyArray),
    ];
};

export const isRouteElementEqual = (route: RouteElement, other: RouteElement) =>
    route && other && (
    route === other ||
    route.routeName === other.routeName && route.key === other.key);

export const isRoutePathEqual = (routePath: RoutePath, other: RoutePath): boolean =>
    routePath.length === other.length && routePath.every((value, index) => isRouteElementEqual(value, other[index]));

/**
 * Path of current navigation route names.
 *
 * E.g. navigation route config `createSomeNavigator({ main: createSomeNavigator({ example: ExampleScreen }) })
 * has route name path `['main', 'example']`.
 */
export const getCurrentRouteNamePath = (
    navigationState: NavigationState | NavigationStateRoute,
): Array<string> =>
    getCurrentRoutePath(navigationState).map(({routeName}) => routeName);


const navigationRoutesToRoutePaths = (routes, level = []) =>
    !routes ? [] : routes.reduce((result, { routeName, key, routes: subRoutes }) => {
        const currentRouteParts = [...level, {routeName, key}];
        return [...result, currentRouteParts].concat(navigationRoutesToRoutePaths(subRoutes, currentRouteParts));
    }, []);

export const getAllRoutePaths = (navigationState: NavigationState) =>
    navigationRoutesToRoutePaths(navigationState.routes);