'user strict';

import React, {
  CameraRoll,
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

  _imageCrop () {
    let imageOffset = {};
    let imageSize = {};
    imageSize.height = this.props.imageData.image.height - 
      ((this.props.imageData.image.width / deviceWidth ) * 
      (deviceHeight/ 4));
    imageSize.width = this.props.imageData.image.width;
    let headerBarHeight = 64;
    imageOffset.x = 0;
    imageOffset.y = (imageSize.width / deviceWidth) * headerBarHeight;;
    let transformData = {
      offset: imageOffset,
      size: imageSize
    };

    ImageEditingManager.cropImage(
      this.props.imageData.image.uri,
      transformData,
      (croppedImageURI) => {
        console.log('inside editing manager');
        CameraRoll.saveImageWithTag(
          croppedImageURI,
        )
      },
      () => undefined,
    );
  }

  _handlePress() {
    if(this.caption.trim() === '') {
      alert('ERROR: Please Input Photo Caption');
      return;
    }
    this.setState({
      isLoading: true,
    });

    /* need to put this in another function */
    let imageOffset = {};
    let imageSize = {};
    imageSize.height = this.props.imageData.image.height - 
      ((this.props.imageData.image.width / deviceWidth ) * 
       (deviceHeight/ 4));
       imageSize.width = this.props.imageData.image.width;
       let headerBarHeight = 64;
       imageOffset.x = 0;
       imageOffset.y = (imageSize.width / deviceWidth) * headerBarHeight;;
       let transformData = {
         offset: imageOffset,
         size: imageSize
       };

       ImageEditingManager.cropImage(
         this.props.imageData.image.uri,
         transformData,
         (croppedImageURI) => {
           console.log('inside editing manager');
           CameraRoll.saveImageWithTag(
             croppedImageURI,
             (data) => {
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
                     filename: data.split('/')[2] + '.JPG',
                     filepath: data,
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
           )
         },
         () => undefined,
       );

    // let POHOTO_POST_URL = PHOTO.POST_URL.replace('{concert_id}', this.props.concertId);
    // let imageObj = {
    //   uploadUrl: POHOTO_POST_URL,
    //   method: 'POST',
    //   fields: {
    //     concert_id: this.props.concertId,
    //     caption: this.caption,
    //   },
    //   files: [
    //     {
    //       name: 'image',
    //       filename: this.props.imageUrl.split('/')[2],
    //       filepath: this.props.imageUrl,
    //     },
    //   ]
    // };
    // NativeModules.FileUpload.upload(imageObj, (err, result) => {
    //   console.log('flex the bottle', err, result);
    //   this.setState({
    //     isLoading: false,
    //   });
    //   this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
    // });
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
