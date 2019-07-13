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
import { connect } from 'react-redux';
import chatSignUpCallback from '../chat/chat';
const faker = require('faker');

const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVhZmlyc3RyZWNvcmRzIn0.P5IjAMTLx7TmN6AL_SPokaU-FcGCOAZWhQRMNFWs-CE';

const theme = {
  'avatar.image': 'border-radius: 8px',
  colors: {
    primary: '#27229E',
    secondary: '#229E84'
  }
};

class ChannelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  chatClient = new StreamChat(
    'b26yk5m25hdm',
    'gzqbum3wdcxnbdsg9fr5m99wcfbr394d5k48ty53gw2j499a2vrj75283uk54axp'
  );

  render() {
    this.chatClient.disconnect();
    this.chatClient.setUser(
      {
        id: 'teafirstrecords',
        name: 'teafirstrecords',
        image: faker.image.cats()
      },
      userToken
    );

    const channel = this.chatClient.channel('messaging', '52380');
    channel.watch();
    return !this.props.user ? (
      <SafeAreaView>
        <Chat client={this.chatClient} style={theme}>
          <Channel channel={channel}>
            <View style={{ display: 'flex', height: '99%' }}>
              <MessageList />
              <MessageInput />
            </View>
            <Thread />
          </Channel>
        </Chat>
      </SafeAreaView>
    ) : (
      <SafeAreaView>
        {/* <ClientChat client={this.props.user} photo={this.props.user.photo} /> */}
        <Chat client={this.chatClient} style={theme}>
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
  }
}

// const ClientChat = ({ client, photo }) => {
//   const chatClient = new StreamChat(
//     'b26yk5m25hdm',
//     'gzqbum3wdcxnbdsg9fr5m99wcfbr394d5k48ty53gw2j499a2vrj75283uk54axp'
//   );

//   let chatUser = {};

//   const initClient = async () => {
//     return (chatUser = await chatSignUpCallback(client.email, client.authid));
//   };

//   if (chatClient) {
//     initClient();
//   }

//   console.log('chatUser:', chatUser);

//   chatClient.disconnect();
//   chatClient.setUser(
//     {
//       id: chatUser.username,
//       name: chatUser.username,
//       image: photo
//     },
//     chatUser.token
//   );
//   const channelTwo = chatClient.channel('messaging', '52380');
//   channelTwo.watch();

//   return (
//     <SafeAreaView>
//       <Chat client={chatClient} style={theme}>
//         <Channel channel={channelTwo}>
//           <View style={{ display: 'flex', height: '99%' }}>
//             <MessageList />
//             <MessageInput />
//           </View>
//           <Thread />
//         </Channel>
//       </Chat>
//     </SafeAreaView>
//   );
// };

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  render = () => <ChannelScreen user={this.props.user} />;
}

function mapStateToProps(state) {
  const user = state;
  return { user: user.userReducer[0] };
}

export default connect(mapStateToProps)(ChatScreen);

ChatScreen.navigationOptions = { title: 'Chat' };
