'use strict'
import React, {
  View,
  Component,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create(require('./style.json'));
import HeaderBar from '../HeaderBar';

export default class ActionScreen extends Component {
  constructor(){
    super();
    this.rows = [];
  }

  _populateRows() {
    console.log(this.props.links);
    this.props.links.map((child, index) => {
      this.rows.push(
        <TouchableHighlight
          key={index}
          style={styles.row}
          onPress={() => { 
            try{
              this.props.links[index].action()
            } catch (e){
              this.props.navigator.pop()}
            }
          }>
          <Text style={styles.text}>{child}</Text>
        </TouchableHighlight>
      )
    })
  }

  render() {
    this._populateRows();
    return(
      <View style={styles.superContainer}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.pop()}
        />
        <View style={styles.container}>
          {this.rows.map((row) => row)}
        </View>
      </View>
    )
  }
}
