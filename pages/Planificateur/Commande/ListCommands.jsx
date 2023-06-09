import {
  Button,
  Modal,
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
import dayjs from 'dayjs'
import Navbar from '../../../components/Navbar'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const ListCommands = ({ navigation }) => {
  const [listCommandsState, setListCommandesState] = useState([])
  const [commande, setCommande] = useState(null)
  const consulterListCommandes = () => {
    axios.get(Constants.expoConfig.extra.url + '/commande').then((response) => {
      setListCommandesState(response.data)
    })
  }
  const route = useRoute()

  const supprimerCommande = () => {
    axios
      .put(Constants.expoConfig.extra.url + '/commande', {
        id: commande._id,
        etat: 'Annulée',
      })
      .then((response) => {
        console.log(response.data)
        setCommande(null)
        consulterListCommandes()
      })
  }

  useEffect(() => {
    consulterListCommandes()
  }, [route, navigation])
  return (
    <ScrollView>
      {commande && (
        <Modal animationType="slide" transparent={true}>
          <Pressable
            onPress={() => {
              setCommande(null)
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
                  supprimerCommande()
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
                  setCommande(null)
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
      <Navbar navigation={navigation} />
      <View>
        <Text>Liste des Agents : {listCommandsState.length} actif</Text>
        <Button
          title="Ajouter une Commande"
          onPress={() => {
            navigation.navigate('Form Commande', { type: 'Ajouter' })
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
                padding: 3,
                display: 'flex',
              }}
            >
              <Text style={{ width: '25%' }}>
                {dayjs(commande.date).format('DD-MM-YYYY')}
              </Text>
              <Text style={{ width: '50%' }}>
                {commande.fournisseur
                  ? commande.fournisseur.firstName +
                    ' ' +
                    commande.fournisseur.lastName
                  : ''}
              </Text>

              <Pressable
                style={{ width: '15%' }}
                disabled={commande.etat !== 'Envoyée'}
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
                style={{ width: '10%' }}
                disabled={commande.etat !== 'Envoyée'}
                onPress={() => {
                  setCommande(commande)
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
