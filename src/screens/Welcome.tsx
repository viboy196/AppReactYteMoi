/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const imageBackground = require('../assets/background.jpeg');

const Welcome = () => {
  return (
    <View style={styles.Screens}>
      <ImageBackground source={imageBackground} style={{flex: 1}}>
        {/* layout logo */}
        <View style={styles.View1}>
          <View style={styles.viewLogo}>
            <Image
              source={require('../assets/icon_fire.png')}
              style={{width: 32, height: 32}}
            />
            <Text style={{fontSize: 32}}>Your Company</Text>
            <View style={{flex: 1}} />
            <Icon size={32} name="phoenix-framework" />
          </View>

          <View style={styles.welcome}>
            <Text>Chào mứng tới</Text>

            <Text>YTẾMỚI</Text>

            <Text>Hãy chọn cách đăng nhập của bạn</Text>
          </View>
        </View>

        <View style={styles.View2}>
          <TouchableOpacity style={styles.View2Button1}>
            <Text>Click 1</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.View3}></View>

        <View style={styles.View4}></View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  Screens: {
    flex: 1,
  },
  View1: {
    flex: 15,
    // backgroundColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  View1Title: {
    fontSize: 32,
    color: 'rgba(0,0,0,0.4)',
  },
  viewLogo: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  logoImage: {
    width: 42,
    height: 42,
  },
  logoTitle: {
    fontSize: 32,
    color: 'rgba(0,0,0,0.4)',
    fontWeight: '700',
  },
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  View2: {
    flex: 30,
    backgroundColor: 'gray',
  },
  View2Button1: {
    width: 245,
    height: 45,
    borderColor: '#fff',
    borderWidth: 2,
  },
  View3: {
    flex: 30,
    backgroundColor: 'blue',
  },

  View4: {
    flex: 15,
    backgroundColor: 'yellow',
  },
  textInputSdt: {},
});

export default Welcome;
