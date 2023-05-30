import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Add Chauffeur')
        }}
      >
        <Text>Ajouter un Chauffeur</Text>
      </TouchableOpacity>
      {user.listeChauffeurs &&
        user.listeChauffeurs.map((chauffeur, index) => {
          return (
            <View
              style={{
                marginTop: 10,

                flexDirection: 'row',

                backgroundColor: index % 2 === 0 ? 'grey' : 'white',
                height: 50,
                padding: 10,
                display: 'flex',

                alignItems: 'center',
              }}
              key={chauffeur._id}
            >
              <Text>{chauffeur.firstName + ' ' + chauffeur.lastName}</Text>
            </View>
          )
        })}
    </View>
  )
}

export default List

const styles = StyleSheet.create({})
