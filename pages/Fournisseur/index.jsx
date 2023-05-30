import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ListCommands from './Commande/ListCommands'

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <View>
        <ListCommands />
      </View>
    </ScrollView>
  )
}

export { Home }

const styles = StyleSheet.create({})
