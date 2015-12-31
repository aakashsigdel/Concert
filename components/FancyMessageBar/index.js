'use strict';

import React, {
  Component,
  Dimensions,
  Text,
  View,
} from 'react-native';
import styles from './style';

export default class FancyMessageBar extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <View style={this.props.viewStyle}>
        <Text style={this.props.messageStyle}>
          {this.props.message}
        </Text>
      </View>
    );
  }
}

FancyMessageBar.propTypes = {
  message: React.PropTypes.string.isRequired,
};

FancyMessageBar.defaultProps = {
  message: 'ERROR',
  viewStyle: styles.container,
  messageStyle: styles.text,
};
