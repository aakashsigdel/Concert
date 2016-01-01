'use strict';
import { Dimensions, StyleSheet } from 'react-native';
const VIEWPORT = Dimensions.get('window');

export default styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  image: {
    width: VIEWPORT.width,
    height: VIEWPORT.height / 2.1,
    backgroundColor: '#1c1c1c', 
  },
	descPanel: {
		position: 'absolute',
		flexDirection: 'row',
		alignItems: 'center',
    width: VIEWPORT.width,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		left: 0,
		right: 0,
		bottom: 0,
		height: 50,
	},
	descText: {
		color: 'white',
		fontSize: 12,
		flex: 7,
		marginLeft: 15,
		fontFamily: 'AvenirNext-DemiBold'
	},
	ratingBox: {
		flexDirection: 'row',
		alignItems: 'center',
    justifyContent: 'center',
		width: 50,
		height: 20,
		paddingLeft: 8,
		marginRight: 10,
		borderRadius: 10,
		backgroundColor: 'white',
	},
  star: {
    marginTop: -2,
  },
	ratingNum: {
		fontSize: 12.5,
		fontFamily: 'AvenirNext-DemiBold'
	},
})
