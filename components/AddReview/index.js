'use strict';
import React, {
  CameraRoll,
  Component,
  Dimensions,
  View,
  Image,
  NativeModules,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Loader from '../../components.ios/Loader';
import HeaderBar from '../HeaderBar';
import { REVIEW } from '../../constants/ApiUrls';

const styles = require('./style.json');

let deviceWidth = Dimensions.get('window').width;
let ImageEditingManager = NativeModules.ImageEditingManager;

export default class AddReview extends Component {
  constructor(){
    super();
    this.comment = '';
    this.state = {
      yellowCount: 1,
      isLoading: false,
    }
  }

  _setStars(starCount){
    this.setState({
      yellowCount: starCount,
    });
  }

	_getStars(yellowStars) {
		let stars = [];
		for(let i = 0; i < yellowStars; i++) {
      let s = i + 1;
			stars.push(
        <TouchableOpacity
          key={100 - i}
          onPress={() => this._setStars(s)}
        >
          <Image
            source={require('../../assets/images/star_yellow.png')}
            style={styles.yellowStar}
          />
        </TouchableOpacity>
			);
		}
		for(let i = 0; i < (5 - yellowStars); i++) {
      let s = i + 1 + yellowStars;
			stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => this._setStars(s) }
        >
          <Image
            source={require('../../assets/images/star_white.png')}
            style={styles.whiteStar}
          />
        </TouchableOpacity>
			);
		}
		return stars;
	}

  _handlePress () {
    if(this.comment.trim() === '') {
      alert('ERROR: Please Input Comment');
      return;
    }
    this.setState({
      isLoading: true,
    });

    if (this.props.imageData) {

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
               let REVIEW_POST_URL = REVIEW.ADD_URL.replace('{concert_id}', this.props.concertId);
               let imageObj = {
                 uploadUrl: REVIEW_POST_URL,
                 method: 'POST',
                 fields: {
                   concert_id: this.props.concertId,
                   comment: this.comment,
                   rating: this.state.yellowCount,
                 },
                 files: [
                   {
                     name: 'image',
                     filename: data.split('/')[2],
                     filepath: data,
                   },
                 ]
               };
               NativeModules.FileUpload.upload(imageObj, (err, result) => {
                 console.log(result, 'posted by posted');
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
    } else {
      let REVIEW_POST_URL = REVIEW.ADD_URL.replace('{concert_id}', this.props.concertId);
      let imageObj = {
        uploadUrl: REVIEW_POST_URL,
        method: 'POST',
        fields: {
          concert_id: this.props.concertId,
          comment: this.comment,
          rating: this.state.yellowCount,
        },
      };
      NativeModules.FileUpload.upload(imageObj, (err, result) => {
        console.log(result, 'posted by posted');
        this.setState({
          isLoading: false,
        });
        this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
      });

    }
    
  }

  render(){
    if (this.state.isLoading)
      return <Loader />;
    return(
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.jumpBack()}

          mid={'ADD REVIEW'}

          right={'POST'}
          clickableRight={true}
          clickFunctionRight={this._handlePress.bind(this)}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.ratingStars}>
            {this._getStars.call(this, this.state.yellowCount)}
          </View>
        </View>

        <TextInput
          style={[styles.text, {
            height: 44, 
            padding: 30,
            paddingTop: 0,
            flex: 1,
            backgroundColor: 'transparent',
            borderBottomWidth: 1, 
            borderBottomColor: 'rgb(51,51,52)' 
          }]}
          placeholder='Write about your concert experience'
          placeholderTextColor="gray"
          onChangeText={(text) => {this.comment = text}}
          multiline={true}>
        </TextInput>
      </View>
    )
  }
}
