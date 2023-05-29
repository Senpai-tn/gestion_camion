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
import dayjs from 'dayjs'

const ListCommands = ({ navigation }) => {
  const [agent, setAgent] = useState(null)
  const [listCommandsState, setListCommandesState] = useState([])

  const consulterListCommandes = () => {
    axios.get(Constants.expoConfig.extra.url + '/commande').then((response) => {
      setListCommandesState(response.data)
    })
  }
  const route = useRoute()

  const [listAgentState, setListAgentState] = useState([])

  const supprimerAgent = (user) => {
    axios
      .put(Constants.expoConfig.extra.url + '/commande', {
        id: user._id,
        deletedAt: new Date(),
      })
      .then((response) => {
        consulterListCommandes()
      })
  }

  const modifierAgent = (user) => {
    setAgent(user)
    navigation.navigate('Form Agent', { type: 'Modifier', agent: user })
  }

  useEffect(() => {
    consulterListCommandes()
  }, [route, navigation])
  return (
    <ScrollView>
      <View>
        <Text>Liste des Agents : {listCommandsState.length} actif</Text>
        <Button
          title="Ajouter un agent"
          onPress={() => {
            navigation.navigate('Form Agent', { type: 'Ajouter' })
          }}
        />
        {listCommandsState.map((agent, index) => {
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
                {dayjs(agent.date).format('DD-MM-YYYY')}
              </Text>
              <Text style={{ marginHorizontal: 30 }}>
                {agent.fournisseur.firstName} {agent.fournisseur.lastName}
              </Text>

              <Pressable
                disabled={agent.etat !== 'Envoyée'}
                style={{ marginHorizontal: 30 }}
                onPress={() => {
                  modifierAgent(agent)
                }}
              >
                <Ionicons
                  name="md-pencil"
                  size={32}
                  color={agent.etat !== 'Envoyée' ? 'black' : 'orange'}
                />
              </Pressable>
              <Pressable
                disabled={agent.etat !== 'Envoyée'}
                onPress={() => {
                  supprimerAgent(agent)
                }}
              >
                <Ionicons
                  color={agent.etat !== 'Envoyée' ? 'black' : 'red'}
                  name="md-trash"
                  size={32}
                />
              </Pressable>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default ListCommands

const styles = StyleSheet.create({})
