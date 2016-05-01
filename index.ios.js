import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

class HelloWorld extends Component {
  render() {
    return (
      <Text style={styles.text}>Hello World (Again)</Text>
    );
  }
}

class Laybium extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Laybium',
          component: HelloWorld,
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

// NOTE: registerComponent cannot start with a capital letter
AppRegistry.registerComponent('laybium', () => Laybium);
