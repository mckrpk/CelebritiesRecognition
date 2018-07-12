/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import GridLayout from 'react-native-layout-grid';

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
		// alert(data[0].name);

		// await Promise.all([getImageByName(), anotherCall()]);

		data.map(item => {
			return alert(item.name)
		})
	};

	renderGridItem = (item) => (
			<View style={styles.item}>
				<View style={styles.flex}/>
				<Text style={styles.name}>
					{item.name}
				</Text>
			</View>
	);

	render() {
		const items = [];
		for (let x = 1; x <= 30; x++) {
			items.push({
				name: `Grid ${x}`
			});
		}
		return (
				<View style={styles.container}>
					<Text style={styles.welcome}>
						Grid Layout
					</Text>
					<View style={styles.flex}>
						<GridLayout
								items={items}
								itemsPerRow={2}
								renderItem={this.renderGridItem}
						/>
					</View>
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
