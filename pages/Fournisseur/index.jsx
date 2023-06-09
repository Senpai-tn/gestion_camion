import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ListCommands from './Commande/ListCommands'
import Navbar from '../../components/Navbar'

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      <View>
        <ListCommands />
      </View>
    </ScrollView>
  )
}

export { Home }

const styles = StyleSheet.create({})
