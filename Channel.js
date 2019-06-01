/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList, Image, TextInput, Button } from "react-native";

const baseUrl = "https://us-central1-frontend-demo-chat.cloudfunctions.net/v1";

type MessageCellProps = {
  message: Message
};

const MessageCell = (props: MessageCellProps) =>
  <View style={styles.message}>
    <Image
      style={styles.messageUserAvatar}
      source={props.message.user.avatar || require('./images/avatar_blank.png')} />
    <View style={styles.messageText}>
      <View style={styles.messageAbout}>
        <Text style={styles.messageUser}>@{props.message.user.name}</Text>
        <Text style={styles.messageDate}>{props.message.date}</Text>
      </View>
      <Text style={styles.messageBody}>{props.message.body}</Text>
    </View>
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

type PostMessage = {
  body: string,
}

type State = {
  messages: Array<Message>,
  messageBody: string,
};

type Props = {};
export default class Channel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      messageBody: '',
    };
  }

  componentDidMount() {
    // 初期データのダウンロード
    this.fetchMessages();
  }

  fetchMessages() {
    fetch(baseUrl + "/channels/general/messages")
      .then(response => response.json())
      .then(json => this.setState({ messages: json.messages }))
      .catch(error => console.log(error));
  }

  postMessage() {
    const payload: PostMessage = { body: this.state.messageBody };
    fetch(
      baseUrl + "/channels/general/messages",
      {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )
      .then((response) => {
        // alert('送信しました。');
        this.fetchMessages();
        this.setState({ messageBody: '' });
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state.messages);
    return (
      <View style={styles.container}>
        <View style={styles.action}>
          <TextInput
            style={styles.actionTextInput}
            placeholder='Message #general'
            onChangeText={(text) => this.setState({ messageBody: text })}
            value={this.state.messageBody} />
          <Button
            title='Send'
            onPress={() => this.postMessage()}
            disabled={this.state.messageBody.length === 0} />
        </View>

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
    justifyContent: "flex-start",
    backgroundColor: "#F5FCFF"
  },
  list: {
    flex: 1,
  },
  message: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    height: 72,
    paddingTop: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  messageUserAvatar: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  messageText: {
    flex: 1,
  },
  messageAbout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 2,
  },
  messageUser: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageDate: {
    marginLeft: 8,
    fontSize: 12,
    color: 'gray',
  },
  messageBody: {
    fontSize: 14,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    // Platform Component
    // 大きさの単位は"dp"(画面密度(Retinaだと2)に関係なく指定できる)
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  actionTextInput: {
    flex: 1,
    paddingLeft: 16,
  }
});
