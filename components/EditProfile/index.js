'use strict';
import React, {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import HeaderBar from '../HeaderBar';

const styles = StyleSheet.create(require('./style.json'));

export default class EditProfile extends Component {
  constructor () {
    super();
    this.state = {
      text: 'This is my name and bio. I love pets, bali and to dance.',
      name: 'Jimmi Andersen'
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/backIcon.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.pop()}
          mid={'EDIT PROFILE'}
        />
        <View style={styles.input_container}>
          <TextInput
            style={[styles.text_input, {height: 44, borderBottomWidth: 1, borderBottomColor: 'rgb(51,51,52)' }]}
            multiline={true}
            defaultValue={this.state.name}
            placeholderTextColor={'lightgray'}>
          </TextInput>
          <TextInput
            multiline={true}
            style={[styles.text_input, {height: 60}]}
            defaultValue={this.state.text}>
          </TextInput>
        </View>
      </View>
    )
  }
}
