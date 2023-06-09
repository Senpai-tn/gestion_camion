import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Button,
} from 'react-native'
import React from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'
import { storeData } from '../../../Utils/localStorage'
import actions from '../../../redux/actions'
import Navbar from '../../../components/Navbar'

const List = ({ navigation }) => {
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()
  const supprimerChauffeur = (chauffeur) => {
    axios
      .put(Constants.expoConfig.extra.url + '/user', {
        id: chauffeur._id,
        deletedAt: new Date(),
      })
      .then((response) => {
        dispatch({
          type: actions.login,
          user: {
            ...user,
            listeChauffeurs: user.listeChauffeurs.filter((c) => {
              return c._id !== response.data._id
            }),
          },
        })
        storeData({
          ...user,
          listeChauffeurs: user.listeChauffeurs.filter((c) => {
            return c._id !== response.data._id
          }),
        })
      })
  }
  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      <Button
        title="Ajouter un chauffeur"
        onPress={() => {
          navigation.navigate('Add Chauffeur', { type: 'Ajouter' })
        }}
      />

      {user.listeChauffeurs &&
        user.listeChauffeurs
          .filter((c) => {
            return c.deletedAt === null
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
                <Text>{chauffeur.firstName + ' ' + chauffeur.lastName}</Text>
                <Pressable
                  onPress={() => {
                    supprimerChauffeur(chauffeur)
                  }}
                >
                  <Ionicons name="md-trash" size={32} color="red" />
                </Pressable>
              </View>
            )
          })}
    </ScrollView>
  )
}

export default List

const styles = StyleSheet.create({})
