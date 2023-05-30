import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useRoute } from '@react-navigation/native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

const ListCommands = ({ navigation }) => {
  const { user } = useSelector((state) => state)
  const [listCommandsState, setListCommandesState] = useState([])
  const [CommandsState, setCommandesState] = useState(null)
  const route = useRoute()

  const modifierCommande = (etat) => {
    axios
      .put(Constants.expoConfig.extra.url + '/commande', {
        id: CommandsState._id,
        etat,
      })
      .then((resonse) => {
        setCommandesState(null)
        consulterListCommandes()
      })
  }
  const consulterListCommandes = () => {
    axios
      .get(Constants.expoConfig.extra.url + '/commande', {
        params: { filter: { fournisseur: user._id } },
      })
      .then((response) => {
        setListCommandesState(response.data)
      })
  }

  useEffect(() => {
    consulterListCommandes()
    ToastAndroid.show(
      "NB : Maintenir sur commande pour l'accepter ou la refuser",
      ToastAndroid.LONG
    )
  }, [route, navigation])
  return (
    <ScrollView>
      <View>
        {CommandsState && (
          <Modal animationType="slide" transparent={true}>
            <View
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
                  Confirmer
                </Text>
                <Pressable
                  onPress={() => {
                    modifierCommande('Confirmée')
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
                  Réfuser
                </Text>
                <Pressable
                  onPress={() => {
                    modifierCommande('Refusée')
                  }}
                >
                  <MaterialCommunityIcons
                    name="sticker-remove"
                    size={65}
                    color="red"
                  />
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
        <Text>{listCommandsState.length} Commande(s)</Text>
        <Text style={{ marginTop: 20, color: 'red', fontWeight: 800 }}>
          NB : Maintenir sur commande pour l'accepter ou la refuser
        </Text>
        {listCommandsState.map((commande, index) => {
          return (
            <Pressable
              onLongPress={() => {
                commande.etat === 'Envoyée' && setCommandesState(commande)
              }}
              key={commande._id}
              style={{
                marginTop: 10,

                flexDirection: 'row',

                backgroundColor:
                  commande.etat === 'Annulée'
                    ? '#ff0000a3'
                    : commande.etat === 'Refusée'
                    ? '#000'
                    : index % 2 === 0
                    ? 'grey'
                    : 'white',
                height: 50,
                padding: 10,
                display: 'flex',

                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  marginHorizontal: 30,
                  color: commande.etat === 'Refusée' ? '#fff' : '#000',
                }}
              >
                {dayjs(commande.createdAt).format('DD-MM-YYYY')}
              </Text>
              <Text
                style={{
                  marginHorizontal: 30,
                  color: commande.etat === 'Refusée' ? '#fff' : '#000',
                }}
              >
                {dayjs(commande.date).format('DD-MM-YYYY')}
              </Text>
              <Text
                style={{
                  marginHorizontal: 30,
                  color: commande.etat === 'Refusée' ? '#fff' : '#000',
                }}
              >
                {commande.etat}
              </Text>

              {commande.etat === 'Envoyée' && <></>}
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default ListCommands

const styles = StyleSheet.create({})
