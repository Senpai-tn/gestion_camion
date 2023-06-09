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

  const supprimerAgent = () => {
    axios
      .put(Constants.expoConfig.extra.url + '/user', {
        id: agent._id,
        deletedAt: new Date(),
      })
      .then((response) => {
        setAgent(null)
        consulterListAgent()
      })
  }

  useEffect(() => {
    consulterListAgent()
  }, [route])
  useEffect(() => {
    consulterListAgent()
  }, [])
  const [agent, setAgent] = useState(null)

  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      {agent && (
        <Modal animationType="slide" transparent={true}>
          <Pressable
            onPress={() => {
              setAgent(null)
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
                  supprimerAgent()
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
                  setAgent(null)
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
              <Text style={{ marginHorizontal: 30 }}>{agent.firstName}</Text>
              <Text style={{ marginHorizontal: 30 }}>{agent.lastName}</Text>

              <Pressable
                onPress={() => {
                  setAgent(agent)
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
