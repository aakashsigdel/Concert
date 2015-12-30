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
import Loader from '../../components.ios/Loader';
import HeaderBar from '../HeaderBar';
import { PHOTO } from '../../constants/ApiUrls';

deviceHeight = Dimensions.get('window').height;

export default class PhotoAddComment extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: false,
    };
    this.caption = '';
  }

  _handlePress() {
    if(this.caption.trim() === '') {
      alert('ERROR: Please Input Photo Caption');
      return;
    }
    this.setState({
      isLoading: true,
    });
    let POHOTO_POST_URL = PHOTO.POST_URL.replace('{concert_id}', this.props.concertId);
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
      this.setState({
        isLoading: false,
      });
      this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
    });
  }

  render () {
    if (this.state.isLoading)
      return <Loader />;
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
