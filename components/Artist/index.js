'use strict'

import React from 'react-native';
import {
  Component,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../Header';
import Photos from '../Photos';
import Reviews from '../Reviews';
import Concerts from '../Concerts';
import InternalNavigation from '../InternalNavigation/';
import FAB from '../FAB';

var viewConstants = {
	photos: 'Photos',
	reviews: 'Reviews',
	concerts: 'Concerts'
};
export default class Artist extends Component {
	constructor() {
	  super();
	  this.state = {
      activeView: viewConstants.photos
	  };
	}

	setActiveView(view) {
		this.setState({
			activeView: view
		});
	}

  render() {
		 return(
			<View style={styles.mainContainer}>
				<Header
				navigator={this.props.navigator}
        concertId={this.props.concertId || 12}
				/>
				<InternalNavigation 
					setActiveView={this.setActiveView.bind(this)} 
					activeView={this.state.activeView} />
				{
					(() => {
						switch(this.state.activeView) {
							case viewConstants.photos: 
								return <Photos 
                  navigator={this.props.navigator}
                  concertId={this.props.concertId}
								  />
							case viewConstants.reviews:
								return <Reviews 
                  navigator={this.props.navigator}
                  concertId={this.props.concertId}
                  />
							case viewConstants.concerts:
                return <Concerts 
                  fetchURL={CONCERTS.ARTIST_UPCOMING_URL.replace('{artist_id}',
                                                                 this.props.artistId )}
                  calanderHeader={true}
                  navigator={this.props.navigator}
                />
						}
					})()
				}

        <FAB 
          navigator={this.props.navigator}
          links={[
            {
              name: 'Add Review',
            },
            {
              name: 'Add Photo',
            },
          ]}
        />
			</View>
		);
  }
}

var styles = StyleSheet.create(require('./style.json'));
