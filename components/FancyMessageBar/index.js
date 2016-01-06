'use strict';

import React, {
  ActivityIndicatorIOS,
  Component,
  Dimensions,
  Image,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Events from 'react-native-simple-events';
import styles from './style';

const deviceWidth = Dimensions.get('window').width;

export default class FancyMessageBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      width: deviceWidth,
      height: 0,
      textHeight: 0,
      padding: 0,
      borderWidth: 0,
    };
  }

  componentDidMount () {
    setTimeout(_ => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        height: 50,
        textHeight: 20,
        width: deviceWidth,
        padding: 15,
        borderWidth: 1,
      });
    }, 1);
  }

  componentDidUpdate (prevProps) {
    if(prevProps.message !== this.props.message) {
      setTimeout(_ => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
          height: 50,
          textHeight: 20,
          width: deviceWidth,
          padding: 15,
          borderWidth: 1,
        });
      }, 1);
    }
  }

  _cancelNotification () {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      height: 0,
      textHeight: 0,
      width: deviceWidth,
      padding: 0,
      borderWidth: 0,
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
        {(
          _ => {
            if (this.props.actionType === 'VIEW' && !this.props.isLoading) 
              return null;
            else
              return (
                <Text style={[
                  styles.text,
                  this.props.messageStyle,
                  {height: this.state.textHeight}
                ]}>
                {this.props.message}
              </Text>
              );
          }
        )()}
        {(
          _ => {
            if(this.props.actionType === 'VIEW') {
              return (
                <View style={styles.dismiss}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.showViewButton,
                      {
                        height: this.state.height,
                      }
                    ]}
                    onPress={
                      _ => {
                        this._cancelNotification();
                        this.props.actionFunction();
                      }
                    }
                    >
                    <Text style={[
                      styles.showViewButtonText,
                      styles.text,
                      {height: this.state.textHeight}
                    ]}>
                      View
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.dismissPost,
                      {
                        height: this.state.height,
                      }
                    ]}
                    onPress={this._cancelNotification.bind(this)}
                    >
                    <Image
                      source={require('../../assets/images/clearCopy.png')}
                      style={{height: this.state.textHeight}}
                    />
                  </TouchableOpacity>
                </View>
              );
            } else if (this.props.isLoading) {
              return (
                <ActivityIndicatorIOS
                  hidden='true'
                  size='small'
                  style={{height: this.state.textHeight}}
                />
              );
            } else {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this._cancelNotification.bind(this)}
                  >
                  <Image
                    source={require('../../assets/images/clearCopy.png')}
                    style={{height: this.state.textHeight}}
                  />
                </TouchableOpacity>
              );
            }
          }
        )()}
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
