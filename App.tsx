/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import {ThemeProvider} from 'react-native-magnus';
import Navigator from './src/navigator';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, useColorScheme} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  //this is where the screens and the store are registered to make it available to the application use, the themeprovider
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar
          barStyle={isDarkMode ? 'dark-content' : 'light-content'}
          backgroundColor={isDarkMode ? 'white' : 'black'}
        />
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
