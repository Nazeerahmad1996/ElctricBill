/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import Stack from './src/Navigation/Stack'


const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1}}>

        <Stack />

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
