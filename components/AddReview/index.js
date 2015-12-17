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
            {this._getStars.call(this, this.state.yellowCount)}
          </View>
          <Text style={styles.text}>
            Write about your concert experience
          </Text>
        </View>
      </View>
    )
  }
}
