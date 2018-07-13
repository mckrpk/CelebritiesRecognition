/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, WebView,} from 'react-native';

const data = [
	{
		"name": "Miranda Kerr",
		"prob": 0.37
	},
	{
		"name": "Natalia Vodianova",
		"prob": 0.14
	},
	{
		"name": "Lizzy Greene",
		"prob": 0.11
	},
	{
		"name": "Paula Riemann",
		"prob": 0.1
	},
	{
		"name": "Amanda Steele",
		"prob": 0.04
	}
];

export default class App extends Component<{}> {

	constructor() {
		super();
		this.makeRequest();
	}

	async makeRequest() {
	};

	render() {
		return (
				<View style={styles.container}>
					<WebView
							source={{uri: 'https://github.com/facebook/react-native'}}
							style={{marginTop: 20}}
					/>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	flex: {
		flex: 1,
	},
	item: {
		height: 150,
		backgroundColor: '#CCCCCC',
		padding: 10,
	},
	name: {
		fontSize: 12,
		textAlign: 'center',
		color: '#000000'
	},
});
