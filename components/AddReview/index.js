'use strict';
import React, {
  Component,
  View,
  Image,
  NativeModules,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import { REVIEW } from '../../constants/ApiUrls';

const styles = require('./style.json');

export default class AddReview extends Component {
  constructor(){
    super();
    this.comment = '';
    this.state = {
      yellowCount: 1,
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
          filename: this.props.imageUrl.split('/')[2],
          filepath: this.props.imageUrl,
        },
      ]
    };
    NativeModules.FileUpload.upload(imageObj, (err, result) => {
      console.log(result, 'posted by posted');
    });
    this.props.navigator.popToTop();
    
  }

  render(){
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
