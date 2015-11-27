'use strict'

import React from 'react-native';
import {
	ActivityIndicatorIOS,
	Component,
	Image,
	StyleSheet,
	Text,
	View,
} from 'react-native';

export default class Review extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    <View>
      <Text>
        This is some text
      </Text>
    </View>
      {/* <View style={header.container}> */}
      {/*   <Text style={header.left} > */}
      {/*     ⨯ */}
      {/*   </Text> */}
      {/*   <Text> */}
      {/*     SKO/TORP */}
      {/*   </Text> */}
      {/*   <Image */}
      {/*     style={header.right} */}
      {/*     source={require('../../assets/images/shareAlt.png')} */}
      {/*   /> */}
      {/* </View> */}

      {/* <View style={heroElement.container}> */}
      {/*   <Image */}
      {/*     source={require('../../assets/images/review_view.png')} */}
      {/*     style={heroElement.image} /> */}
      {/*   <View */}
      {/*     style={heroElement.footer} > */}
      {/*     <Calendar />  */}
      {/*     <Text> */}
      {/*       SKANDERBORG FESTIVAL */}
      {/*     </Text> */}
      {/*   </View> */}
      {/*   </View> */}

      {/*<View style={comment.container} > */}
      {/*   </View> */}
      {/*   </View> */}
  }

}

let header = StyleSheet.create(require('./header.json'));
let heroElement = StyleSheet.create(require('./heroElement.json'));
let comment = StyleSheet.create(require('./comment.json'));
