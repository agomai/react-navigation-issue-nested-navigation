/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {ExposedRootNavigator, RootNavigator} from './nested-navigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ExposedRootNavigator />
    );
  }
}
