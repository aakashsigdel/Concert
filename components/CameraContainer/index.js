'use strict';

import React, {
  Component,
  StyleSheet,
  View,
} from 'react-native';

import UserCamera from '../UserCamera';
import CameraConfirmation from '../CameraConfirmation';
import HeaderBar from '../HeaderBar'

export default class CameraContainer extends Component {
  constructor() {
    super();
    this.state = {
      captured: null,
    };
  }

  setCaptured(captured) {
    this.setState({
      captured: captured
    });
  }

  render () {
    console.log(this.props.navigator, 'coffee phalano');
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          mid="TAKE A PHOTO"
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.pop()}
        />
        {(() => {
        if(this.state.captured === null) {
          return (
            <View>
            <UserCamera
              setCaptured={this.setCaptured.bind(this)}
            />
            </View>
          )
        } else {
          return(
            <CameraConfirmation
              captured={this.state.captured}
              setCaptured={this.setCaptured.bind(this)}
              navigator={this.props.navigator}
            />
          );
        }
      })()}
    </View>
    );
  }
}
