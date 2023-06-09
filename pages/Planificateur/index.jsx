import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { ListAgent } from './Agent'

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <View>
        <ListAgent navigation={navigation} />
      </View>
    </ScrollView>
  )
}

export { Home }

const styles = StyleSheet.create({})
