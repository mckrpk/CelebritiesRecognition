import React, { Component } from 'react';
import Camera from 'react-native-camera';
import { Platform, StyleSheet, Text, View, Dimensions, TouchableHighlight, TouchableOpacity, Image } from 'react-native';

export default class App extends Component {

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
          <TouchableOpacity onPress={()=>this.takePicture()}>
            <Image
              source={require('./img/capture.png')}
              style={{ width: 80, height: 80}}
            />
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }

  testPress(){
    alert('ok it works');
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data)
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
    }).then(myjson => {console.log(myjson.faces[0].celebrity)});
  }
}

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
  }
});