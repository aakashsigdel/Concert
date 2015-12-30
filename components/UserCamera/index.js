'use strict';

import React, {
  CameraRoll,
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import HeaderBar from '../HeaderBar';
import CameraConfirmation from '../CameraConfirmation';

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
          imageSize.height = data.edges[0].node.image.height - ((data.edges[0].node.image.width / deviceWidth ) * (deviceHeight/ 4));
          imageSize.width = data.edges[0].node.image.width;
          let headerBarHeight = 64;
          imageOffset.x = 0;
          imageOffset.y = (imageSize.width / deviceWidth) * headerBarHeight;;
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
          });
        },
        (error) => undefined,
      );
    });
  }

  _skip () {
    this.props.navigator.push({
      name: 'addReview',
      concertId: this.props.concertId,
      review: this.props.review,
    });
  }

  _showCameraRoll () {
    this.props.navigator.push({
      name: 'cameraroll',
      concertId: this.props.concertId,
      review: this.props.review,
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
          style={[styles.camera, {width: deviceWidth, height: deviceWidth}]}
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
                    <Text style={styles.uploadOptionsText}>Skip</Text>
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
