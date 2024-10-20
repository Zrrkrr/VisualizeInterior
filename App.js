import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import AppNav from './navigation/AppNav'
import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <AppNav/>
      </NavigationContainer>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})