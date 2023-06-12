import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Button,
  Modal,
} from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { storeData } from '../../../Utils/localStorage'
import actions from '../../../redux/actions'
import Navbar from '../../../components/Navbar'

const List = ({ navigation }) => {
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [chauffeur, setChauffeur] = useState(null)
  const supprimerChauffeur = () => {
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
        setChauffeur(null)
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

      {chauffeur && (
        <Modal animationType="slide" transparent={true}>
          <Pressable
            onPress={() => {
              setChauffeur(null)
            }}
            style={{
              height: 150,
              width: '100%',
              flex: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffffc9',
            }}
          >
            <View
              style={{
                flex: 0.1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ width: 150, fontSize: 20, fontWeight: 700 }}>
                Oui
              </Text>
              <Pressable
                onPress={() => {
                  supprimerChauffeur()
                }}
              >
                <MaterialCommunityIcons
                  name="sticker-check"
                  size={65}
                  color="green"
                />
              </Pressable>
            </View>
            <View
              style={{
                flex: 0.1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ width: 150, fontSize: 20, fontWeight: 700 }}>
                Non
              </Text>
              <Pressable
                onPress={() => {
                  setChauffeur(null)
                }}
              >
                <MaterialCommunityIcons
                  name="sticker-remove"
                  size={65}
                  color="red"
                />
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}

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
                    setChauffeur(chauffeur)
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
