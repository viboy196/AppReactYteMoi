import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setCustomText} from 'react-native-global-props';
import {StackPrams} from '../navigation/App';

const customTextProps = {
  style: {
    fontFamily: 'Roboto',
  },
};
const Main = () => {
  setCustomText(customTextProps);

  const navigation = useNavigation<NativeStackNavigationProp<StackPrams>>();
  const params = navigation
    .getState()
    .routes.find(tr => tr.name === 'Main')?.params;

  console.log('nhan dc', navigation);

  // const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.Screens}>
      {/* layout logo */}
      <View style={styles.View1}>
        <View style={styles.ViewTitleLogo}>
          <Text style={styles.TitleLogo}>Y Tế Mới</Text>
          <Text style={styles.TitleConten}>Màn hình chính</Text>
        </View>
        <View style={styles.ViewImagesLogo}>
          <Image
            source={require('../assets/ytemoitron.png')}
            style={styles.logoImage}
          />
        </View>
      </View>
      <View>
        <Text>id nguoi dung {params?.info.id}</Text>

        <Text>token : {params?.info.token}</Text>
      </View>
      <View style={styles.View2}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Đăng xuât</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Screens: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  View1: {
    flex: 400,
    flexDirection: 'row',
    alignItems: 'center',
  },

  View2: {
    flex: 600,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },

  ViewTitleLogo: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleLogo: {
    color: '#000',
    fontSize: 32,
    fontWeight: '700',
  },
  TitleConten: {
    fontSize: 18,
    fontWeight: '700',
  },
  ViewImagesLogo: {flex: 2},
  logoImage: {
    width: 128,
    height: 128,
  },
  logoTitle: {
    fontSize: 32,
    color: 'rgba(0,0,0,0.4)',
    fontWeight: '700',
  },

  ViewInputGroup: {
    marginHorizontal: 20,
    paddingTop: 20,
    flex: 550,
  },
  labelInput: {
    color: '#1cacf6',
    fontSize: 18,
  },
  ViewInput: {
    borderBottomColor: '#1cacf6',
    marginBottom: 30,

    borderBottomWidth: 2,
  },
  ViewInputType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  View3: {
    flex: 500,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 40,
  },
  buttonLogin: {
    width: 250,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#5b5959',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextLogin: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Festive',
  },
  createAccount: {
    margin: 15,
  },
  createTextAccount: {color: '#007bff'},
  textInput: {
    flex: 4,
  },
  viewInputIconDone: {
    flex: 0.5,
    color: '#007bff',
  },
  viewInputIconError: {
    flex: 0.5,
    color: 'red',
  },
  viewloginOn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLoginOnlinerLer: {
    flex: 1,
    height: 1,
    backgroundColor: '#5b5959',
    padding: 1,
  },
  LoginOnGroups: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
});

export default Main;
