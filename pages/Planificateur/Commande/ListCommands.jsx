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
  const [listCommandsState, setListCommandesState] = useState([])

  const consulterListCommandes = () => {
    axios.get(Constants.expoConfig.extra.url + '/commande').then((response) => {
      setListCommandesState(response.data)
    })
  }
  const route = useRoute()

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
        {listCommandsState.map((commande, index) => {
          return (
            <View
              key={commande._id}
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
                {dayjs(commande.date).format('DD-MM-YYYY')}
              </Text>
              <Text style={{ marginHorizontal: 30 }}>
                {commande.fournisseur
                  ? commande.fournisseur.firstName +
                    ' ' +
                    commande.fournisseur.lastName
                  : ''}
              </Text>

              <Pressable
                disabled={commande.etat !== 'Envoyée'}
                style={{ marginHorizontal: 30 }}
                onPress={() => {
                  modifierAgent(commande)
                }}
              >
                <Ionicons
                  name="md-pencil"
                  size={32}
                  color={commande.etat !== 'Envoyée' ? 'black' : 'orange'}
                />
              </Pressable>
              <Pressable
                disabled={commande.etat !== 'Envoyée'}
                onPress={() => {
                  supprimerAgent(commande)
                }}
              >
                <Ionicons
                  color={commande.etat !== 'Envoyée' ? 'black' : 'red'}
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
