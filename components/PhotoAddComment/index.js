'use strict';

import React, {
  CameraRoll,
  Component,
  Dimensions,
  NativeModules,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Loader from '../../components.ios/Loader';
import HeaderBar from '../HeaderBar';
import { PHOTO } from '../../constants/ApiUrls';
import {
  callOnError,
  cropImage,
  getAccessToken,
  postToRevuze,
} from '../../utils';
import Events from 'react-native-simple-events';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

let ImageEditingManager = NativeModules.ImageEditingManager;

export default class PhotoAddComment extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: false,
    };
    this.caption = '';
  }

  async _handlePress() {
    if(this.caption.trim() === '') {
      alert('ERROR: Please Input Photo Caption');
      return;
    }
    this.props.navigator.popToTop();
    Events.trigger('POST', {
      data: {
        message: 'Posting Photo',
        viewStyle: {backgroundColor: '#F9B400'},
      }
    });

    let imageOffset = {};
    let imageSize = {};
    imageSize.height = this.props.imageData.image.width;
    imageSize.width = this.props.imageData.image.width;
    imageOffset.x = 0;
    const headerBarHeight = 0.096 * deviceHeight;
    const pixelRatio = PixelRatio.get();
    imageOffset.y =
      (this.props.imageData.image.height / deviceHeight)
      * headerBarHeight * pixelRatio;
    let transformData = {
      offset: imageOffset,
      size: imageSize
    };
    debugger;

    cropImage(this.props.imageData.image.uri, transformData)
    .then(res => {
      getAccessToken()
      .then(access_token => {
        let PHOTO_POST_URL = PHOTO.POST_URL
        .replace('abcde', access_token)
        .replace('{concert_id}', this.props.concertId);
        let imageObj = {
          uploadUrl: PHOTO_POST_URL,
          method: 'POST',
          fields: {
            concert_id: this.props.concertId,
            caption: this.caption,
          },
          files: [
            {
              name: 'image',
              filename: res.split('/')[2] + '.jpg',
              filepath: res,
            },
          ]
        };
        postToRevuze(imageObj)
        .then(result => {
          Events.trigger('POSTED', {
            data: {
              message: 'Photo Posted',
              viewStyle: {backgroundColor: '#F9B400'},
              actionType: 'VIEW',
              actionFunction: () => {
                let resultData = JSON.parse(result.data);
                this.props.navigator.immediatelyResetRouteStack([
                  {name: 'home'},
                  {name: 'photo', photoId: resultData.data.id}
                ]);
              }
            }
          });
        })
        .catch(error => {
          throw(error);
        })
      })
    })
    .catch(error => {
      callOnError(error);
    })
  }

  render () {
    if (this.state.isLoading)
      return <Loader
        loadingMessage="Posting Photo..."
      />;
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
