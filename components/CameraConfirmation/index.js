'use strict';

import React, {
  CameraRoll,
  Component,
  Dimensions,
  Image,
  NativeModules,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import { REVIEW } from '../../constants/ApiUrls';
import { getAccessToken } from '../../utils.js';
import Events from 'react-native-simple-events';

var deviceWidth = Dimensions.get('window').width;
let ImageEditingManager = NativeModules.ImageEditingManager;

export default class CameraConfirmation extends Component {
  _confirm() {
    if(this.props.review) {
      this.props.navigator.popToTop();
      Events.trigger('POST', {
        data: {
          message: 'Posting Review',
          viewStyle: {backgroundColor: '#F9B400'},
        }
      });

      /* need to put this in another function */
      let imageOffset = {};
      let imageSize = {};
      imageSize.height = this.props.imageData.image.width;
      imageSize.width = this.props.imageData.image.width;
      const headerBarHeight = 0.096 * deviceHeight;
      imageOffset.x = 0;
      const pixelRatio = PixelRatio.get();
      imageOffset.y =
        (this.props.imageData.image.height / deviceHeight)
        * headerBarHeight * pixelRatio;
        let transformData = {
          offset: imageOffset,
          size: imageSize
        };

        ImageEditingManager.cropImage(
          this.props.imageData.image.uri,
          transformData,
          (croppedImageURI) => {
            getAccessToken()
            .then( access_token => {
              CameraRoll.saveImageWithTag(
                croppedImageURI,
                (data) => {
                  let REVIEW_POST_URL = REVIEW.ADD_URL.replace('{concert_id}', this.props.concertId);
                  let imageObj = {
                    uploadUrl: REVIEW_POST_URL.replace('abcde', access_token),
                    method: 'POST',
                    fields: {
                      concert_id: this.props.concertId,
                      comment: this.props.comment,
                      rating: this.props.rating,
                    },
                    files: [
                      {
                        name: 'image',
                        filename: data.split('/')[2]+ '.jpg',
                        filepath: data,
                      },
                    ]
                  };
                  NativeModules.FileUpload.upload(imageObj, (err, result) => {
                    Events.trigger('POSTED', {
                      data: {
                        message: 'Review Posted',
                        viewStyle: {backgroundColor: '#F9B400'},
                        actionType: 'VIEW',
                        actionFunction: () => {
                          let resultData = JSON.parse(result.data);
                          this.props.navigator.immediatelyResetRouteStack([
                            {name: 'home'},
                            {name: 'review', review_id: resultData.id}
                          ]);
                        }
                      }
                    });
                  });
                }
              )
            } )
          },
          () => undefined,
        );

    } else {
      this.props.navigator.push({
        name: 'photoAddComment',
        index: 22,
        concertId: this.props.concertId,
        imageData: this.props.imageData,
      });
    }
  }

  _cancel() {
    this.props.navigator.pop();
  }

  render () {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: this.props.imageData.image.uri}} 
          style={[styles.capturedImage, {width: deviceWidth, height: deviceWidth}]} 
          />
          <View style={[styles.confirm, {width: deviceWidth}]}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this._confirm.bind(this)}
            >
              <View style={styles.circle}>
                <Text style={styles.yesText}>
                  {this.props.review ? 'POST' : 'YES'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this._cancel.bind(this)}
            >
              <View style={styles.circle}>
                <Image
                  source={require('../../assets/images/clearCopy.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create(require('./style.json'));
