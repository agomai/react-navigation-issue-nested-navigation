import {NavigationActions} from "react-navigation";

export const navigatePathAction = (path) =>
    (typeof path === 'string' ? path.split('.') : path)
        .map(routeName => NavigationActions.navigate({ routeName }))
        .reduce(
            ([result, current], action) => {
                result = result || action;
                current = current || action;
                if (action) {
                    current.action = action;
                    return [result, action];
                }
                return [result, current];
            },
            [null, null]
        )[0];