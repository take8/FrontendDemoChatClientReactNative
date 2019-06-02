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

export default class App extends Component<{}> {
  channels: Array<string>;
  _AppDrawerNavigator: any;

  constructor(props: {}) {
    super(props);
    this.channels = ['general', 'random'];

    let drawerMenus: any = new Object();
    this.channels.forEach(channelName => {
      Object.assign(drawerMenus, { [channelName]: this.createDrawerMenu(channelName) });
    });
    this._AppDrawerNavigator = DrawerNavigator(drawerMenus);
  }

  createDrawerMenu(channelName: string) {
    return {
      screen: StackNavigator(
        {
          Home: { screen: Channel }
        }, {
          initialRouteParams: {
            channelName: channelName
          }
        }
      ),
      navigatorOptions: {
        drawerLabel: `# ${channelName}`
      }
    }
  }

  render() {
    const AppDrawerNavigator: any = this._AppDrawerNavigator;
    return <AppDrawerNavigator />;
  }
}
