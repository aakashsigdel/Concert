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
import {
  getAccessToken,
  callOnFetchError,
} from '../../utils.js';
import Events from 'react-native-simple-events';

const styles = require('./style.json');

let deviceWidth = Dimensions.get('window').width;
let ImageEditingManager = NativeModules.ImageEditingManager;

export default class EditReview extends Component {
  constructor(props){
    super(props);
    this.comment = props.params.review.comment;
    this.state = {
      yellowCount: props.params.review.rating,
      isLoading: false,
    }
  }

  componentDidMount(){
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

  _postEditReview(){
    fetch(
      this.props.params.url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: this.comment,
          rating: this.state.yellowCount,
        })
      }).then( res =>{
        if (res.ok){
          this.props.navigator.pop();
          this.props.navigator.replace({name: 'review', review_id: this.props.params.review.id})
        }
      }).catch( e =>{
        callOnFetchError(e, this.props.params.url);
      })
  }

  componentWillUnmount () {
        // this.props.navigator.replace({name: 'review', review_id: this.props.params.review.id})
  }

  render(){
    if (this.state.isLoading)
      return <Loader
        loadingMessage="Posting Review..."
      />;
    return(
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.jumpBack()}

          mid={'EDIT REVIEW'}

          right={'POST'}
          clickableRight={true}
          clickFunctionRight={this._postEditReview.bind(this)}
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
          defaultValue={this.props.params.review.comment}
          onChangeText={(text) => {this.comment = text}}
          multiline={true}>
        </TextInput>
      </View>
    )
  }
}
