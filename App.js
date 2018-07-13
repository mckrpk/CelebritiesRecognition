import React, {Component} from 'react';
import Camera from 'react-native-camera';
import {
	Dimensions,
	Image,
	StyleSheet, Text,
	TouchableOpacity,
	View,
	ViewPagerAndroid,
	WebView
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import IndicatorViewPager from "rn-viewpager/viewpager/IndicatorViewPager";
import PagerTitleIndicator from "rn-viewpager/viewpager/indicator/PagerTitleIndicator";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},

	viewPager: {
		flex: 1
	},
	pageStyle: {
		alignItems: 'center',
		padding: 20,
	}
});

const getImageSearchQueryUrl = (fullName) => `https://www.google.pl/search?q=${fullName}&source=lnms&tbm=isch`;
let webViewUrl = '';
let actorNamesArray = [];

class CameraScreen extends Component {
	render() {
		return (
				<View style={styles.container}>
					<Camera
							ref={(cam) => {
								this.camera = cam;
							}}
							style={styles.preview}
							aspect={Camera.constants.Aspect.fill}
							type='front'>
						<TouchableOpacity onPress={() => this.takePicture()}>
							<Image
									source={require('./img/capture.png')}
									style={{width: 80, height: 80}}
							/>
						</TouchableOpacity>
					</Camera>
				</View>
		);
	}

	takePicture() {
		this.camera.capture()
				.then((data) => {
					console.log(data);
					this.sendRequest(data.path);
				})
				.catch(err => console.error(err));
	}

	sendRequest(imagePath) {
		const data = new FormData();
		data.append('models', 'celebrities');
		data.append('api_user', '1376917843');
		data.append('api_secret', 'qHBY6kF5m6LcJrMusp9g');
		data.append('media', {
			uri: imagePath,
			type: 'image/jpeg',
			name: 'testPhotoName'
		});

		fetch('https://api.sightengine.com/1.0/check.json', {
			method: 'post',
			body: data
		}).then(res => {
			return res.json();
		}).then(myjson => {
			console.log('Got celebrities-----------' + myjson.faces[0].celebrity);
			webViewUrl = getImageSearchQueryUrl(myjson.faces[0].celebrity[0].name);
			actorNamesArray = myjson.faces[0].celebrity.map(item => item.name);
			console.log(`actor names: ${actorNamesArray}`);
			console.log(myjson.faces[0].celebrity);
			this.props.navigation.push('Details');
		});
	}
}

class DetailsScreen extends React.Component {
	render() {
		return (
				<IndicatorViewPager
						style={{flex: 1, paddingTop: 20, backgroundColor: 'white'}}
						indicator={this._renderTitleIndicator()}
				>
					{this.renderPagerItem()}
				</IndicatorViewPager>
		);
	}

	renderPagerItem() {
		return actorNamesArray.map((fullName , index)=> <View key={index}>
					<WebView
							source={{uri: getImageSearchQueryUrl(fullName)}}
							style={{marginTop: 0}}
					/>
				</View>
		)
	}

	_renderTitleIndicator = () => <PagerTitleIndicator titles={actorNamesArray}/>;
}

const RootStack = createStackNavigator(
		{
			Camera: CameraScreen,
			Details: DetailsScreen,
		},
		{
			initialRouteName: 'Camera',
		}
);


export default class App extends Component {
	render() {
		return <RootStack/>;
	}
}
