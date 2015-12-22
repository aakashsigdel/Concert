'use strict';
import {Dimensions, StyleSheet} from 'react-native';
const VIEWPORT = Dimensions.get('window');

export default styles = StyleSheet.create({
	photoThumb: {
		marginBottom: 3
	},
  
	listView: {
		backgroundColor: '#1C1C1C',
		flexDirection: 'row',
		flexWrap: 'wrap',
    width: VIEWPORT.width,
		justifyContent: 'space-between',
    paddingBottom: 60,
	}
});
