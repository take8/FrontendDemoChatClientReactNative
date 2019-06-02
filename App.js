/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Channel from "./Channel";

// ChannelコンポーネントがHomeというルートに表示されるStackNavigatorの定義
const ChannelNavigator = StackNavigator({
  Home: {
    screen: Channel,
  }
});

export default class App extends Component<{}> {
  render() {
    return <ChannelNavigator />;
  }
}
