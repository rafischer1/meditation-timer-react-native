import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { MontserratText } from '../components/StyledText';

const BasicScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.shadow}>
        <Image
          style={{
            width: 250,
            height: 300,
            borderRadius: 5,
            marginTop: 30
          }}
          source={{
            uri:
              'https://images.unsplash.com/photo-1505129137389-dc838a46f3f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80'
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <MontserratText style={{ fontSize: 36, paddingTop: 5 }}>
        Login to see chat
      </MontserratText>
    </ScrollView>
  );
};

// -=-Stylesheet Definition-=-
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  shadow: {
    alignItems: 'center',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 1.0
  }
});

export default BasicScreen;
