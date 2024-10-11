import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import AppNav from './navigation/AppNav'



export default function App() {
  return (
    <View style={styles.container}>
      <AppNav/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})