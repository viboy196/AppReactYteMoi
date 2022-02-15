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

import {
  validatePhoneVietNam,
  validatePass,
  validatePassRedo,
  validateEmail,
  validateRegister,
} from '../Ultils/validations';

interface RegisterRequest {
  phone?: string;
  password?: string;
  email?: string;
  fullname?: string;
}

interface TypeButtonRegister {
  status?: Number;
  text?: string;
}

const Register = () => {
  setCustomText(customTextProps);
  const URL = 'http://27.71.228.66:8099/api/User/register?v=1.0';

  const [registerRequest, setLoginRequest] = useState<RegisterRequest>();

  const [passRedo, setPassRedo] = useState<string>();

  const [stateButton, setStateButton] = useState<TypeButtonRegister>({
    status: 0,
    text: 'Tiếp tục',
  });

  const [activateNumb, setActivateNum] = useState('');

  console.log('RegisterRequest', registerRequest);
  const onPressRegister = async () => {
    const checkValidate = validateRegister({
      ...registerRequest,
      passwordRedo: passRedo,
    });
    console.log('checkValidate: ', checkValidate);
    if (stateButton.status === 2) {
      console.log('vào kích hoạt');
      // Simple POST request with a JSON body using fetch
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          phone: registerRequest?.phone,
          activeCode: activateNumb,
        }),
      };
      const response = await fetch(
        'http://27.71.228.66:8099/api/User/active?v=1.0',
        requestOptions,
      );
      const data = await response.json();
      console.log('data', data);
      if (data.status) {
        setStateButton({
          status: 2,
          text: 'Kích hoạt',
        });
      }
    }
    if (stateButton.status === 1) {
      if (checkValidate === 2) {
        console.log('vào gửi đăng ký');
        // Simple POST request with a JSON body using fetch
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(registerRequest),
        };
        const response = await fetch(URL, requestOptions);
        const data = await response.json();
        console.log('data', data);
        if (data.status) {
          setStateButton({
            status: 2,
            text: 'Kích hoạt',
          });
        }
      }
      return;
    }
    if (stateButton.status === 0) {
      if (checkValidate > 0)
        setStateButton({
          status: 1,
          text: 'Đăng ký',
        });
      return;
    }
  };

  return (
    <SafeAreaView style={styles.Screens}>
      <ScrollView style={styles.scrollView}>
        {/* layout logo */}
        <View style={styles.View1}>
          <View style={styles.ViewTitleLogo}>
            <Text style={styles.TitleLogo}>Y Tế Mới</Text>
            <Text style={styles.TitleConten}>Đăng ký</Text>
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
          {stateButton.status === 0 && (
            <View>
              <View style={styles.ViewInput}>
                <Text style={styles.labelInput}>Họ và tên :</Text>
                <View style={styles.ViewInputType}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Họ và tên'}
                    value={registerRequest?.fullname}
                    onChangeText={text => {
                      const copyLogin: RegisterRequest = {
                        ...registerRequest,
                        fullname: text,
                      };
                      console.log(copyLogin);
                      setLoginRequest(copyLogin);
                    }}
                  />
                  {!(
                    registerRequest?.fullname === undefined ||
                    registerRequest?.fullname === ''
                  ) &&
                    (validatePass(registerRequest?.fullname) ? (
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
                <Text style={styles.labelInput}>Email :</Text>
                <View style={styles.ViewInputType}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Email'}
                    value={registerRequest?.email}
                    onChangeText={text => {
                      const copyLogin: RegisterRequest = {
                        ...registerRequest,
                        email: text,
                      };
                      console.log(copyLogin);
                      setLoginRequest(copyLogin);
                    }}
                  />
                  {!(
                    registerRequest?.email === undefined ||
                    registerRequest?.email === ''
                  ) &&
                    (validateEmail(registerRequest?.email) ? (
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
                <Text style={styles.labelInput}>Số điện thoại :</Text>
                <View style={styles.ViewInputType}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Số điện thoại'}
                    value={registerRequest?.phone}
                    onChangeText={text => {
                      const copyLogin: RegisterRequest = {
                        ...registerRequest,
                        phone: text,
                      };
                      console.log(copyLogin);
                      setLoginRequest(copyLogin);
                    }}
                  />

                  {!(
                    registerRequest?.phone === undefined ||
                    registerRequest?.phone === ''
                  ) &&
                    (validatePhoneVietNam(registerRequest?.phone) ? (
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
          )}

          {stateButton.status === 1 && (
            <View>
              <View style={styles.ViewInput}>
                <Text style={styles.labelInput}>Mật khẩu :</Text>
                <View style={styles.ViewInputType}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Mật khẩu'}
                    value={registerRequest?.password}
                    secureTextEntry={true}
                    onChangeText={text => {
                      const copyLogin: RegisterRequest = {
                        ...registerRequest,
                        password: text,
                      };
                      console.log(copyLogin);
                      setLoginRequest(copyLogin);
                    }}
                  />
                  {!(
                    registerRequest?.password === undefined ||
                    registerRequest?.password === ''
                  ) &&
                    (validatePass(registerRequest?.password) ? (
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
                <Text style={styles.labelInput}> Nhập lại mật khẩu :</Text>
                <View style={styles.ViewInputType}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Mật khẩu'}
                    value={passRedo}
                    secureTextEntry={true}
                    onChangeText={text => {
                      setPassRedo(text);
                    }}
                  />
                  {!(passRedo === undefined || passRedo === '') &&
                    (validatePassRedo(passRedo, registerRequest?.password) ? (
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
          )}

          {stateButton.status === 2 && (
            <View>
              <View style={styles.ViewInput}>
                <Text style={styles.labelInput}>
                  Nhập mã kích hoạt được gửi về :
                </Text>
                <View style={styles.ViewInputType}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Mã Kích Hoạt'}
                    keyboardType="numeric"
                    value={activateNumb}
                    secureTextEntry={true}
                    onChangeText={text => {
                      setActivateNum(text);
                    }}
                  />
                  {!(activateNumb === undefined || activateNumb === '') &&
                    (activateNumb.length === 6 ? (
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
          )}
        </View>
        {/* layout button */}
        <View style={styles.View3}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {stateButton.status === 1 && (
              <TouchableOpacity
                style={styles.buttonGoBack}
                activeOpacity={0.7}
                onPress={() => {
                  setStateButton({
                    status: 0,
                    text: 'Tiếp tục',
                  });
                }}>
                <Icon
                  style={styles.viewInputIconDone}
                  name="angle-left"
                  size={24}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.buttonLogin}
              activeOpacity={0.7}
              onPress={() => onPressRegister()}>
              <Text style={styles.buttonTextLogin}>{stateButton.text}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewloginOn}>
            <View style={styles.viewLoginOnlinerLer} />
            <Text> Đăng nhập Bằng </Text>
            <View style={styles.viewLoginOnlinerLer} />
          </View>
          <View style={styles.LoginOnGroups}>
            {/* <Text>Facebook</Text>
          <Text>Google</Text> */}
            <Icon
              name="facebook"
              size={48}
              style={{marginRight: 10, color: 'blue'}}
            />

            <Icon
              name="google"
              size={48}
              style={{marginLeft: 10, color: 'red'}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Screens: {
    flex: 1,
    backgroundColor: '#1cacf6',
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
    padding: 20,
    marginHorizontal: 15,
    flex: 550,
    backgroundColor: '#fff',
    borderRadius: 30,
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
  },
  buttonLogin: {
    marginTop: 10,
    width: 250,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGoBack: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    marginTop: 20,
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

export default Register;
