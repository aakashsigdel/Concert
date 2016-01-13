'use strict';

import React, {
  CameraRoll,
  Component,
  Dimensions,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import HeaderBar from '../HeaderBar';
import CameraConfirmation from '../CameraConfirmation';
import { REVIEW } from '../../constants/ApiUrls';
import { getAccessToken } from '../../utils.js';
import Events from 'react-native-simple-events';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class UserCamera extends Component {
  constructor () {
    super();
    this.state = {
      cameraType: Camera.constants.Type.back,
    };
  }

  _switchCamera() {
    if(this.state.cameraType === Camera.constants.Type.front)
      this.setState({
        cameraType: Camera.constants.Type.back,
      });
    else {
      this.setState({
        cameraType: Camera.constants.Type.front,
      });
    }
  }

  _takePicture() {
    _this = this;
    this.refs.cam.capture(function(err, data) {
      var imageOffset = {};
      var imageSize = {};
      CameraRoll.getPhotos(
        {first: 1},
        (data) => {
          // imageSize.height = data.edges[0].node.image.height - ((data.edges[0].node.image.width / deviceWidth ) * (deviceHeight 4));
          imageSize.height = data.edges[0].node.image.width;
          imageSize.width = data.edges[0].node.image.width;
          let headerBarHeight = 64;
          imageOffset.x = 0;
          imageOffset.y = (data.edges[0].node.image.height / deviceHeight) * headerBarHeight;;
          let transformData = {
            offset: imageOffset,
            size: imageSize
          };
          let photoURI = data.edges[0].node.image.uri;
          _this.props.navigator.push({
            name: 'cameraConfirmation',
            imageData: data.edges[0].node,
            concertId: _this.props.concertId,
            review: _this.props.review,
            comment: _this.props.comment,
            rating: _this.props.rating,
          });
        },
        (error) => undefined,
      );
    });
  }

  _skip () {
    this.props.navigator.popToTop();
    Events.trigger('POST', {
      data: {
        message: 'Posting Review',
        viewStyle: {backgroundColor: '#F9B400'},
      }
    });
    getAccessToken()
    .then( access_token => {
      let REVIEW_POST_URL = REVIEW.ADD_URL
      .replace('abcde', access_token)
      .replace('{concert_id}', this.props.concertId);
      let imageObj = {
        uploadUrl: REVIEW_POST_URL,
        method: 'POST',
        fields: {
          concert_id: this.props.concertId,
          comment: this.props.comment,
          rating: this.props.rating,
        },
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

    } )


    // this.props.navigator.push({
    //   name: 'addReview',
    //   concertId: this.props.concertId,
    //   review: this.props.review,
    // });
  }

  _showCameraRoll () {
    this.props.navigator.push({
      name: 'cameraroll',
      concertId: this.props.concertId,
      review: this.props.review,
      comment: this.props.comment,
      rating: this.props.rating,
    });
  }

  render () {
    return (
      <View style={[styles.container, {height: deviceHeight}]}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          mid="TAKE A PHOTO"
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.pop()}
        />
        <Camera
          ref="cam"
          aspect={Camera.constants.Aspect.fill}
          style={[{width: deviceWidth, height: deviceWidth}]}
          type={this.state.cameraType}
        />
        <View style={styles.bottomView}>
          {(() => {
            if (this.props.review) {
              return (
                <View style={styles.uploadOptions}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this._showCameraRoll.bind(this)}
                    style={styles.uploadOption}
                    >
                    <Text style={styles.uploadOptionsText}>Camera Roll</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this._skip.bind(this)}
                    style={styles.skip}
                    >
                    <Text style={styles.uploadOptionsText}>Post Without Photo</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })()}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this._switchCamera.bind(this)}
            >
              <Image
                source={require('../../assets/images/switch-camera.png')}
                style={styles.switchCamera}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this._takePicture.bind(this)}
            >
              <Image
                source={require('../../assets/images/camera-icon.png')}
                style={styles.takePicture}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
            >
              <View style={styles.viewPhoto}></View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create(require('./style.json'));
