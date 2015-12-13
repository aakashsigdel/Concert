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
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          mid="TAKE A PHOTO"
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
            />
          );
        }
      })()}
    </View>
    );
  }
}
