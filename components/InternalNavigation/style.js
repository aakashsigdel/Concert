'use strict';
import {Dimensions, StyleSheet} from 'react-native';

const VIEWPORT = Dimensions.get('window');

export default styles = StyleSheet.create({
	navContainer: {
		flexDirection: 'row',
		backgroundColor: 'black',
    width: VIEWPORT.width,
		height: 48,
		alignItems: 'stretch',
	},
	navTextContainer: {
		flex: 1,
		alignItems: 'center',
	},
	navTextReviews: {
		fontSize: 14,
		color: 'white',
		opacity: 0.4,
		marginTop: 13,
		fontFamily: 'AvenirNext-DemiBold',
	},
	navTextPhotos: {
		fontSize: 14,
		color: 'white',
		opacity: 0.4,
		marginTop: 13,
		fontFamily: 'AvenirNext-DemiBold'
	},
	navTextConcerts: {
		fontSize: 14,
		color: 'white',
		opacity: 0.4,
		marginTop: 13,
		fontFamily: 'AvenirNext-DemiBold'
	},
	textOpaque: {
		color: 'white',
		opacity: 1 
	}
});
