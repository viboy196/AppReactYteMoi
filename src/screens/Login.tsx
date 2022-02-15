import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {setCustomText} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'Roboto',
  },
};
import Icon from 'react-native-vector-icons/FontAwesome5';

import {validatePhoneVietNam, validatePass} from '../Ultils/validations';

interface LoginRequest {
  phone?: string;
  password?: string;
  token?: string;
}

const Login = ({navigation}) => {
  setCustomText(customTextProps);
  const URL = 'http://27.71.228.66:8099/api/Auth/login?v=1.0';

  const [loginRequest, setLoginRequest] = useState<LoginRequest>();
  console.log('loginRequest', loginRequest);
  const onPressLogin = async () => {
    // Simple POST request with a JSON body using fetch
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phone: loginRequest?.phone,
        password: loginRequest?.password,
      }),
    };
    const response = await fetch(URL, requestOptions);
    const data = await response.json();
    console.log('data', data);
    if (data.status) {
      setLoginRequest({
        ...loginRequest,
        token: data.result,
      });
      navigation.navigate('Main');
    }
    console.log(loginRequest);
  };

  return (
    <SafeAreaView style={styles.Screens}>
      <ScrollView style={styles.scrollView}>
        {/* layout logo */}
        <View style={styles.View1}>
          <View style={styles.ViewTitleLogo}>
            <Text style={styles.TitleLogo}>Y Tế Mới</Text>
            <Text style={styles.TitleConten}>Đăng nhập</Text>
          </View>
          <View style={styles.ViewImagesLogo}>
            <Image
              source={require('../assets/ytemoitron.png')}
              style={styles.logoImage}
            />
          </View>
        </View>
        {/* layout Input */}
        <View style={styles.ViewInputGroup}>
          <View style={styles.ViewInput}>
            <Text style={styles.labelInput}>Số điện thoại :</Text>
            <View style={styles.ViewInputType}>
              <TextInput
                style={styles.textInput}
                placeholder={'Số điện thoại'}
                value={loginRequest?.phone}
                onChangeText={text => {
                  const copyLogin: LoginRequest = {
                    ...loginRequest,
                    phone: text,
                  };
                  console.log(copyLogin);
                  setLoginRequest(copyLogin);
                }}
              />

              {loginRequest !== undefined &&
                (validatePhoneVietNam(loginRequest?.phone) ? (
                  <Icon
                    style={styles.viewInputIconDone}
                    name="check"
                    size={24}
                  />
                ) : (
                  <Icon
                    style={styles.viewInputIconError}
                    name="times-circle"
                    size={24}
                  />
                ))}
            </View>
          </View>

          <View style={styles.ViewInput}>
            <Text style={styles.labelInput}>Mật khẩu :</Text>
            <View style={styles.ViewInputType}>
              <TextInput
                style={styles.textInput}
                placeholder={'Mật khẩu'}
                value={loginRequest?.password}
                secureTextEntry={true}
                onChangeText={text => {
                  const copyLogin: LoginRequest = {
                    ...loginRequest,
                    password: text,
                  };
                  console.log(copyLogin);
                  setLoginRequest(copyLogin);
                }}
              />
              {loginRequest !== undefined &&
                (validatePass(loginRequest?.password) ? (
                  <Icon
                    style={styles.viewInputIconDone}
                    name="check"
                    size={24}
                  />
                ) : (
                  <Icon
                    style={styles.viewInputIconError}
                    name="times-circle"
                    size={24}
                  />
                ))}
            </View>
          </View>
        </View>
        {/* layout button */}
        <View style={styles.View3}>
          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.7}
            onPress={() => onPressLogin()}>
            <Text style={styles.buttonTextLogin}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createAccount}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.createTextAccount}>
              Tạo tài khoản ? Đăng ký ngay
            </Text>
          </TouchableOpacity>
          <View style={styles.viewloginOn}>
            <View style={styles.viewLoginOnlinerLer} />
            <Text>Đăng nhập Bằng</Text>
            <View style={styles.viewLoginOnlinerLer} />
          </View>
          <View style={styles.LoginOnGroups}>
            {/* <Text>Facebook</Text>
          <Text>Google</Text> */}
            <TouchableOpacity
              style={styles.createAccount}
              activeOpacity={0.7}
              onPress={() => {}}>
              <Icon
                name="facebook"
                size={48}
                style={{marginRight: 10, color: 'blue'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createAccount}
              activeOpacity={0.7}
              onPress={() => {}}>
              <Icon
                name="google"
                size={48}
                style={{marginLeft: 10, color: 'red'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Screens: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {},
  View1: {
    flex: 400,
    flexDirection: 'row',
    alignItems: 'center',
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

export default Login;
