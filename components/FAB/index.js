'use strict';
import React, {
  Component,
  Image,
  Navigator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create(require('./style.json'));

export default class FAB extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigator.push({
            name: 'actionScreen',
            index: 24,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            links: this.props.links
          })}>
          <Image
            style={styles.image}
            source={require('../../assets/images/review.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
