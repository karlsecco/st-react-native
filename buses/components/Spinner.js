import React, { PureComponent } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default class Home extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
