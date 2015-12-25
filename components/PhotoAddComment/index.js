'user strict';

import React, {
  Component,
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';

deviceHeight = Dimensions.get('window').height;

export default class PhotoAddComment extends Component {
  constructor () {
    super();
    this.caption = '';
  }

  _handlePress() {
    let POHOTO_POST_URL = 'http://api.revuzeapp.com/api/v1/concerts/12/photo?access_token=abcde';
    let imageObj = {
      uploadUrl: POHOTO_POST_URL,
      method: 'POST',
      fields: {
        concert_id: this.props.concertId,
        caption: this.caption,
      },
      files: [
        {
          name: 'image',
          filename: this.props.imageUrl.split('/')[2],
          filepath: this.props.imageUrl,
        },
      ]
    };
    NativeModules.FileUpload.upload(imageObj, (err, result) => {
      console.log('flex the bottle', err, result);
    });
    this.props.navigator.popToTop();
  }

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
          clickFunctionRight={this._handlePress.bind(this)}
        />
        <TextInput
          onChangeText={(text) => {this.caption = text}}
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
