/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import {ExposedRootNavigator} from './nested-navigation';
import ExposedRootNavigator from './nested-navigation-sub-action.snack';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ExposedRootNavigator />
    );
  }
}
