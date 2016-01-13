import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const VIEWPORT = Dimensions.get('window');
const HEADERBAR_HEIGHT = 0.096 * VIEWPORT.height;

let styles = {
	reviewContainer: {
		flexDirection: 'row',
	},
	reviewDetails: {
		flex: 1,
    marginTop: 10,
	},
	profileImage: {
		width: 123,
		height: 123,
		marginRight: 12
	},
	ratingStars: {
		flexDirection: 'row',
    flex: 1,
	},
	starsAndUser: {
		flexDirection: 'row',
    flex: 1,
	},
	star: {
    height: 13.1,
	  width: 80,
	  resizeMode: 'contain',
	},
	whiteStar: {
    width: 13.7,
    height: 13.1,
    marginRight: 2.8,
	},
  nameAndComment: {
    marginTop: -10,
    backgroundColor: 'transparent',
  },
	username: {
		color: 'white',
		fontSize: 11,
		fontFamily: 'AvenirNext-DemiBold'
	},
	comment: {
		color: 'white',
		fontSize: 11,
    opacity: 0.5,
		fontFamily: 'AvenirNext-Regular',
    backgroundColor: 'transparent',
    marginRight: 5,
    marginTop: 7.5,
	},
	listView: {
    flex: 1,
		backgroundColor: '#1C1C1C',
	},
  userImage: {
    justifyContent: 'flex-end',
    marginRight: 15,
    width: 0.54 * HEADERBAR_HEIGHT,
    height: 0.54 * HEADERBAR_HEIGHT,
    resizeMode: 'contain',
    borderColor: '#F9B400',
    borderWidth: 1,
    borderRadius: 0.27 * HEADERBAR_HEIGHT,
  },
	calendarContainer: {
    position: 'absolute',
		alignItems: 'center',
    backgroundColor: 'rgb(17,17,17)',
    borderWidth: 0,
    bottom: 0,
    left: 0,
	},
};

export default styles = StyleSheet.create(styles);
