import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Thread
} from 'stream-chat-expo';
const faker = require('faker');

const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmVzdGxlc3Mtc2hhZG93LTgifQ.x7hpfGfq022jYDFBBbq54fC2CBqqoTHMQWsbgQxBz5o';

const theme = {
  'avatar.image': 'border-radius: 8px',
  colors: {
    primary: '#27229E',
    secondary: '#229E84'
  }
};

const ChannelScreen = () => {
  const chatClient = new StreamChat(
    'b26yk5m25hdm',
    'gzqbum3wdcxnbdsg9fr5m99wcfbr394d5k48ty53gw2j499a2vrj75283uk54axp'
  );

  chatClient.setUser(
    {
      id: 'restless-shadow-8',
      name: 'Med Timer',
      image: faker.image.avatar()
    },
    userToken
  );

  const channel = chatClient.channel('messaging', '52380');
  channel.watch();

  return (
    <SafeAreaView>
      <Chat client={chatClient} style={theme}>
        <Channel channel={channel}>
          <View style={{ display: 'flex', height: '99%' }}>
            <MessageList />
            <MessageInput />
          </View>
          <Thread />
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};

export default class ChatScreen extends React.Component {
  render = () => <ChannelScreen />;
}

ChatScreen.navigationOptions = { title: 'Chat' };
