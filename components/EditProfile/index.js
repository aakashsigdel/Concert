'use strict';
import React, {
  Component,
  InteractionManager,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import { USERS } from '../../constants/ApiUrls.js'
import {
  serializeJSON,
  callOnFetchError,
  getAccessToken,
} from '../../utils.js'

const styles = StyleSheet.create(require('./style.json'));

export default class EditProfile extends Component {
  constructor () {
    super();
    this.state = {
      userData: null,
      renderPlaceholder: true,
    }
  }

  componentDidMount(){
    console.log(this.props.userData);

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        userData: this.props.userData,
        renderPlaceholder: false,
      });
    });
  }

  _postEdit() {
    getAccessToken().then( access_token => {
      console.log('editing..',USERS.PROFILE_EDIT_URL, this.state.userData);
      const params = {
        fname: this.state.userData.full_name,
        bio: this.state.userData.bio,
      }

      fetch(
        USERS.PROFILE_EDIT_URL.replace('abcde', access_token),
        {
          method: 'POST',
          json: true,
          body: serializeJSON(params)
        }
      ).then( res => {
        console.log('params', params);
        console.log('data-> ', res.text());
        console.log('res->',res);
        this.props.navigator.replace({
          name: 'profile',
          userId: this.state.userData.id,
          userName: this.state.userData.full_name,
          bio: this.state.userData.bio,
        })
      })
      .catch((error) => {
        callOnFetchError(error, USERS.PROFILE_EDIT_URL);
      }).done();
    } )
  }

  render(){
    if ( this.state.renderPlaceholder )
      return (
        <View style={{flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'lightgray'}}> Loading...  </Text>
      </View>
      )
    return(
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/backIcon.png')}
          clickableLeft={true}
          clickFunctionLeft={() => {
            this.props.navigator.replace({
              name: 'profile',
              userId: this.state.userData.id,
              userName: this.state.userData.full_name,
              bio: this.state.userData.bio,
            })
          }}
          mid={'EDIT PROFILE'}
          right={'POST'}
          clickableRight={true}
          clickFunctionRight={this._postEdit.bind(this)}
        />
        <View style={styles.input_container}>
          <TextInput
            style={[styles.text_input, {height: 44, borderBottomWidth: 1, borderBottomColor: 'rgb(51,51,52)' }]}
            multiline={true}
            onChangeText={ text => this.setState({
              userData: Object.assign({}, this.state.userData, {full_name: text})
            })}
            value={this.state.userData.full_name}
            defaultValue={this.props.userData.full_name}
            placeholderTextColor={'lightgray'}>
          </TextInput>
          <TextInput
            multiline={true}
            style={[styles.text_input, {height: 60}]}
            onChangeText={ text => this.setState({
              userData: Object.assign({}, this.state.userData, {bio: text})
            })}
            value={this.state.userData.bio}
            defaultValue={this.props.userData.bio}>
          </TextInput>
        </View>
      </View>
    )
  }
}
