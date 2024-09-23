import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Login from './screen/Login'

export default function App() {
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})