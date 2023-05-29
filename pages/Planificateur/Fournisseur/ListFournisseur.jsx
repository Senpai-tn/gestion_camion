import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import FormFournisseur from './FormFournisseur'
const ListFournisseur = ({ navigation }) => {
  const [fournisseur, setFournisseur] = useState(null)
  const route = useRoute()

  const [listFournisseurState, setListFournisseursState] = useState([])

  const consulterListAgent = () => {
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

  const supprimerAgent = (user) => {
    axios
      .put(Constants.expoConfig.extra.url + '/user', {
        id: user._id,
        deletedAt: new Date(),
      })
      .then((response) => {
        consulterListAgent()
      })
  }

  const modifierAgent = (user) => {
    setFournisseur(user)
    navigation.navigate('Form Fournisseur', { type: 'Modifier', agent: user })
  }

  useEffect(() => {
    consulterListAgent()
  }, [route, navigation])
  return (
    <ScrollView>
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
              <Text style={{ marginHorizontal: 30 }}>
                {agent.firstName} {agent.lastName}
              </Text>
              <Pressable
                style={{ marginHorizontal: 30 }}
                onPress={() => {
                  modifierAgent(agent)
                }}
              >
                <Ionicons name="md-pencil" size={32} color="orange" />
              </Pressable>
              <Pressable
                onPress={() => {
                  supprimerAgent(agent)
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
