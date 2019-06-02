/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Channel from "./Channel";

const AppDrawerNavigator = DrawerNavigator({
  // generalチャンネル
  general: {
    screen: StackNavigator(
      {
        Home: { screen: Channel }
      }, {
        initialRouteParams: {
          channelName: 'general'
        }
      }
    ),
    navigatorOptions: {
      drawerLabel: '# general'
    }
  },
  // randomチャンネル
  random: {
    screen: StackNavigator(
      {
        Home: { screen: Channel }
      }, {
        initialRouteParams: {
          channelName: 'random'
        }
      }
    ),
    navigatorOptions: {
      drawerLabel: '# random'
    }
  }
});

export default class App extends Component<{}> {
  render() {
    return <AppDrawerNavigator />;
  }
}
