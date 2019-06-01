/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";

const baseUrl = "https://us-central1-frontend-demo-chat.cloudfunctions.net/v1";

type MessageCellProps = {
  message: Message
};

const MessageCell = (props: MessageCellProps) =>
  <View>
    <Text>{props.message.body}</Text>
  </View>

type Message = {
  id: string,
  body: string,
  user: {
    id: string,
    name: string,
    avatar: string
  },
  date: string
};

type State = {
  messages: Array<Message>
};

type Props = {};
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    // 初期データのダウンロード
    fetch(baseUrl + "/channels/general/messages")
      .then(response => response.json())
      .then(json => this.setState({ messages: json.messages }))
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.messages);
    return (
      <View style={styles.container}>
        {/* keyExtractor: dataを区別するためのidを取得する関数を設定する */}
        <FlatList
          style={styles.list}
          data={this.state.messages.slice().reverse()}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => <MessageCell message={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  list: {
    flex: 1,
    // Platform Component
    // 大きさの単位は"dp"(画面密度(Retinaだと2)に関係なく指定できる)
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  }
});
