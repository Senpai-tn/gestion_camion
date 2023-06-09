import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useRoute } from '@react-navigation/native'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Navbar from '../../../components/Navbar'

const ListFournisseur = ({ navigation }) => {
  const route = useRoute()
  const [fournisseur, setFournisseur] = useState(null)
  const [listFournisseurState, setListFournisseursState] = useState([])

  const consulterListFournisseurs = () => {
    axios
      .get(Constants.expoConfig.extra.url + '/user/search', {
        params: {
          role: 'FOURNISSEUR',
        },
      })
      .then((response) => {
        setListFournisseursState(response.data)
      })
  }

  const supprimerFournisseur = () => {
    axios
      .put(Constants.expoConfig.extra.url + '/user', {
        id: fournisseur._id,
        deletedAt: new Date(),
      })
      .then((response) => {
        consulterListFournisseurs()
        setFournisseur(null)
      })
  }

  useEffect(() => {
    consulterListFournisseurs()
  }, [route, navigation])
  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      {fournisseur && (
        <Modal animationType="slide" transparent={true}>
          <Pressable
            onPress={() => {
              setFournisseur(null)
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
                  supprimerFournisseur()
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
                  setFournisseur(null)
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
      <View>
        <Text>List des Fournisseurs : {listFournisseurState.length} actif</Text>
        <Button
          title="Ajouter un Fournisseur"
          onPress={() => {
            // ajouterAgent()
            navigation.navigate('Form Fournisseur')
          }}
        />
        {listFournisseurState.map((agent, index) => {
          return (
            <View
              key={agent._id}
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: index % 2 === 0 ? 'grey' : 'white',
                height: 50,
                padding: 10,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text style={{ marginHorizontal: 30 }}>{agent.firstName}</Text>
              <Text style={{ marginHorizontal: 30 }}>{agent.lastName}</Text>

              <Pressable
                onPress={() => {
                  setFournisseur(agent)
                }}
              >
                <Ionicons name="md-trash" size={32} color="red" />
              </Pressable>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default ListFournisseur

const styles = StyleSheet.create({})
