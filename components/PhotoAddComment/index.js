'user strict';

import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';

deviceHeight = Dimensions.get('window').height;

export default class PhotoAddComment extends Component {
  render () {
    return (
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          mid="ADD COMMENT"
          right="POST"
          clickableLeft={true}
          clickableRight={true}
          clickFunctionLeft={() => this.props.navigator.pop()}
          clickFunctionRight={() => this.props.navigator.push({name: 'home', index: 0})}
        />
        <TextInput
          multiline={true}
          placeholder="Add a comment to your picture"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={[{height: deviceHeight / 2}, styles.textArea]}
          numberOfLines={8}
          />
      </View>
    );
  }
}

let styles = StyleSheet.create(require('./styles.json'));
