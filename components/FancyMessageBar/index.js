'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';

const deviceWidth = Dimensions.get('window').width;

export default class FancyMessageBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      width: deviceWidth,
      height: 0,
      textHeight: 0
    };
  }

  componentDidMount () {
    setTimeout(_ => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        height: 50,
        textHeight: 20,
        width: deviceWidth,
      });
    }, 500);
    setTimeout(_ => {
      if (this.state.height !== 0) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
          height: 0,
          textHeight: 0,
          width: deviceWidth,
        });
      }
    }, 4000);
  }

  _cancelNotification () {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      height: 0,
      textHeight: 0,
      width: deviceWidth,
    });
  }

  render () {
    return (
      <View style={[
          styles.container,
          this.props.viewStyle, 
          {
            width: this.state.width,
            height: this.state.height,
          }
        ]}>
        <Text style={[
          styles.text,
          this.props.messageStyle,
          {height: this.state.textHeight}
        ]}>
          {this.props.message}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this._cancelNotification.bind(this)}
          >
          <Image
            source={require('../../assets/images/clearCopy.png')}
            style={{height: this.state.textHeight}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

FancyMessageBar.propTypes = {
  message: React.PropTypes.string.isRequired,
};

FancyMessageBar.defaultProps = {
  message: 'ERROR',
  viewStyle: undefined,
  messageStyle: undefined,
};
