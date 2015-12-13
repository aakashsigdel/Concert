'use strict';
import React, {
  Component,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import HeaderBar from '../HeaderBar';

const styles = require('./style.json');

export default class AddReview extends Component {
  constructor(){
    super();
  }

	_getStars(yellowStars) {
		var stars = [];
		for(var i = 0; i < yellowStars; i++) {
			//stars.push(<Text style={styles.yellowStar}>★</Text>);
			stars.push(
			  <Image
          source={require('../../assets/images/star_yellow.png')}
          style={styles.yellowStar}
			  />
			);
		}
		for(var i = 0; i < (5 - yellowStars); i++) {
			//stars.push(<Text style={styles.whiteStar}>★</Text>);
			stars.push(
			  <Image
          source={require('../../assets/images/star_white.png')}
          style={styles.whiteStar}
			  />
			);
		}
		return stars;
	}

  render(){
    return(
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.jumpBack()}

          mid={'ADD REVIEW 2/3'}

          right={'NEXT'}
          clickableRight={true}
          clickFunctionRight={() => 1}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.ratingStars}>
            {this._getStars(3)}
          </View>
          <Text style={styles.text}>
            Write about your concert experience
          </Text>
        </View>
      </View>
    )
  }
}
