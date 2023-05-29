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
const ListAgent = ({ navigation }) => {
  const route = useRoute()

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

  useEffect(() => {
    consulterListAgent()
  }, [route])
  useEffect(() => {
    consulterListAgent()
  }, [])
  return (
    <ScrollView>
      <View>
        <Text>Liste des Agents : {listAgentState.length} actif</Text>
        <Button
          title="Ajouter un agent"
          onPress={() => {
            navigation.navigate('Form Agent', { type: 'Ajouter' })
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
                <Ionicons name="md-trash" size={32} color="red" />
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
