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
const ListAgent = () => {
  const [listAgentState, setListAgentState] = useState([])
  const consulterListAgent = () => {
    axios
      .get(Constants.expoConfig.extra.url + '/user/search', {
        params: {
          role: 'AGENT_SECURITE',
        },
      })
      .then((response) => {
        setListAgentState(response.data)
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

  const ajouterAgent = () => {
    axios
      .post(Constants.expoConfig.extra.url + '/user', {
        firstName: 'CC',
        lastName: 'CC',
        email: 'cc@gmail.com',
        password: 'cc',
        tel: '22',
        cin: '22',
        role: 'AGENT_SECURITE',
        listeCamions: [],
        listeChauffeurs: [],
        categorie: '',
        adresse: '',

        listeCommandes: [],
      })
      .then((response) => {
        consulterListAgent()
      })
  }

  useEffect(() => {
    consulterListAgent()
  }, [])
  return (
    <ScrollView>
      <View>
        <Text>ListAgent {listAgentState.length}</Text>
        <Button
          title="Ajouter un agent"
          onPress={() => {
            ajouterAgent()
          }}
        />
        {listAgentState.map((agent, index) => {
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
                onPress={() => {
                  supprimerAgent(agent)
                }}
              >
                <Text>Supprimer</Text>
              </Pressable>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default ListAgent

const styles = StyleSheet.create({})
