import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'

const List = ({ navigation }) => {
  const { user } = useSelector((state) => state)
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('Add Chauffeur')
        }}
      >
        <Text>+</Text>
      </TouchableHighlight>
      {user.listeChauffeurs &&
        user.listeChauffeurs.map((chauffeur) => {
          return <Text>{chauffeur.firstName + ' ' + chauffeur.lastName}</Text>
        })}
    </View>
  )
}

export default List

const styles = StyleSheet.create({})
