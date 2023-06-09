import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
  Button,
} from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useDispatch, useSelector } from 'react-redux'

import Ionicons from '@expo/vector-icons/Ionicons'
import actions from '../../../redux/actions'
import { storeData } from '../../../Utils/localStorage'
import Navbar from '../../../components/Navbar'

const List = ({ navigation }) => {
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()

  const modifierCamion = (camion) => {
    navigation.navigate('Add Truck', { camion, type: 'Modifier' })
  }

  const supprimerCamion = (camion) => {
    axios
      .put(Constants.expoConfig.extra.url + '/truck', {
        id: camion._id,
        deletedAt: new Date(),
      })
      .then((response) => {
        dispatch({
          type: actions.login,
          user: {
            ...user,
            listeCamions: user.listeCamions.filter((c) => {
              return c._id !== response.data._id
            }),
          },
        })
        storeData({
          ...user,
          listeCamions: user.listeCamions.filter((c) => {
            return c._id !== response.data._id
          }),
        })
      })
  }

  return (
    <View>
      <Navbar navigation={navigation} />
      <Button
        title="Ajouter un Camions"
        onPress={() => {
          navigation.navigate('Add Truck', { type: 'Ajouter' })
        }}
      />
      {user.listeCamions &&
        user.listeCamions
          .filter((camion) => {
            return camion.deletedAt === null
          })
          .map((chauffeur, index) => {
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
                <Text style={{ width: '40%' }}>{chauffeur.model}</Text>
                <Text style={{ width: '40%' }}>{chauffeur.serieNumber}</Text>
                <Pressable
                  onPress={() => {
                    modifierCamion(chauffeur)
                  }}
                >
                  <Ionicons name="md-pencil" size={32} color="orange" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    supprimerCamion(chauffeur)
                  }}
                >
                  <Ionicons name="md-trash" size={32} color="red" />
                </Pressable>
              </View>
            )
          })}
    </View>
  )
}

export default List

const styles = StyleSheet.create({})
