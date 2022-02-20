import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {Login, Register, Welcome, Main} from '../screens';
import {LoginRequest} from '../screens/Login';

export type StackPrams = {
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
  Main: {
    info: LoginRequest;
  };
};

const Stack = createStackNavigator<StackPrams>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'Welcome'} component={Welcome} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen
          name={'Register'}
          component={Register}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name={'Main'}
          component={Main}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
