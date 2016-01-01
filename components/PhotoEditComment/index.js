'use strict';

import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import { serializeJSON, callOnFetchError } from '../../utils';

deviceHeight = Dimensions.get('window').height;

export default class PhotoEditComment extends Component {
  _postEditedPhoto () {
    console.log(serializeJSON({
        photo_id: this.props.photoId,
        caption: this.caption
      })
);
    console.log(this.caption, 'kalooo');
    fetch(this.props.fetchURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        photo_id: this.props.photoId,
        caption: this.caption
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.props.navigator.pop();
      this.props.navigator.replace({name: 'photo', photoId: this.props.photoId})
    })
    .catch(error => {
      callOnFetchError(error, this.props.fetchURL);
    })
    .done();
  }

  render () {
    return (
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          mid="EDIT"
          right="SAVE"
          clickableLeft={true}
          clickableRight={true}
          clickFunctionLeft={() => this.props.navigator.pop()}
          clickFunctionRight={() => this._postEditedPhoto.call(this)}
        />
        <TextInput
          multiline={true}
          placeholder="Add a comment to your picture"
          defaultValue={this.props.caption}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={[{height: deviceHeight / 2}, styles.textArea]}
          numberOfLines={8}
          onChangeText={(text) => this.caption = text}
          />
      </View>
    );
  }
}

let styles = StyleSheet.create(require('./styles.json'));

