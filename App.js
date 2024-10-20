import { View, StyleSheet, Platform } from 'react-native';
import React from 'react';
import AppNav from './navigation/AppNav';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? '10%' : '4%',
    backgroundColor: "#f5f5f5", 
  },
});
