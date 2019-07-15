import React, { PureComponent } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import BasicScreen from './BasicScreen';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Thread,
  CloseButton
} from 'stream-chat-expo';
import { connect } from 'react-redux';
const faker = require('faker');
import { createAppContainer, createStackNavigator } from 'react-navigation';

const chatClient = new StreamChat(
  '22duw8598t3y',
  '32knywdz384xrnqgzkmfrt3wm49yn3vsvrgw59gpcac6kujzv27jedjsz2bfy3dh'
);

const theme = {
  'avatar.image': 'border-radius: 8px',
  colors: {
    primary: '#27229E',
    secondary: '#229E84'
  }
};

class ChannelScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      signedIn: false,
      token: '1',
      username: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={{ fontWeight: 'bold', height: 20 }}>Med Timer Chat</Text>
      )
    };
  };

  render() {
    {
      return this.props.screenProps === undefined
        ? basicScreen()
        : chatWithUserScreen(this.props);
    }
  }
}

class ThreadScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ fontWeight: 'bold' }}>Thread</Text>,
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ marginRight: 20 }}
      >
        <CloseButton style={theme} />
      </TouchableOpacity>
    )
  });

  render() {
    const { navigation } = this.props;
    const thread = navigation.getParam('thread');
    const channel = chatClient.channel('messaging', '55341');
    return (
      <SafeAreaView>
        <Chat client={chatClient}>
          <Channel client={chatClient} channel={channel} thread={thread}>
            <View
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'flex-start'
              }}
            >
              <Thread thread={thread} />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Channel: {
      screen: ChannelScreen
    },
    Thread: {
      screen: ThreadScreen
    }
  },
  {
    initialRouteName: 'Channel'
  }
);

const AppContainer = createAppContainer(RootStack);

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  render() {
    return <AppContainer screenProps={this.props.user} />;
  }
}

function mapStateToProps(state) {
  const user = state;
  return {
    user: user.userReducer[0]
  };
}

const basicScreen = () => {
  return <BasicScreen />;
};

const chatWithUserScreen = props => {
  chatClient.disconnect();
  chatClient.setUser(
    {
      id: props.screenProps.googleUser.email.split('@')[0],
      name: props.screenProps.googleUser.email.split('@')[0],
      image: props.screenProps.googleUser.photo
    },
    props.screenProps.token
  );
  const channel = chatClient.channel('messaging', '55341');
  channel.watch();
  return (
    <SafeAreaView>
      <Chat client={chatClient} style={theme}>
        <Channel client={chatClient} channel={channel}>
          <View style={{ display: 'flex', height: '100%' }}>
            <MessageList
              onThreadSelect={thread => {
                props.navigation.navigate('Thread', {
                  thread,
                  channel: channel,
                  chatClient: chatClient
                });
              }}
            />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(ChatScreen);

ChatScreen.navigationOptions = { title: 'Chat' };
