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
import Navbar from '../../../components/Navbar'
import { Controller, useForm } from 'react-hook-form'
import Dropdown from '../../../components/Dropdown'

const ListCommands = ({ navigation }) => {
  const { user } = useSelector((state) => state)
  const [listCommandsState, setListCommandesState] = useState([])
  const [ListFournisseur, setListFourniListFournisseur] = useState([])
  const [listCamions, setListCoamions] = useState([])
  const [CommandsState, setCommandesState] = useState(null)
  const [showFormulaire, setShowFormulaire] = useState(null)
  const route = useRoute()
  const { control, watch } = useForm({
    defaultValues: { chauffeur: null, camion: null },
  })

  const consulterListFournisseurs = () => {
    axios
      .get(Constants.expoConfig.extra.url + '/user/search', {
        params: {
          role: 'CHAUFFEUR',
          deletedAt: null,
        },
      })
      .then((response) => {
        setListFourniListFournisseur(response.data)
      })
  }

  const consulterListCamions = () => {
    axios
      .get(Constants.expoConfig.extra.url + '/truck', {
        params: {
          deletedAt: null,
        },
      })
      .then((response) => {
        setListCoamions(response.data)
      })
  }
  const modifierCommande = (etat) => {
    axios
      .put(Constants.expoConfig.extra.url + '/commande', {
        id: CommandsState._id,
        etat,
      })
      .then((resonse) => {
        etat === 'Confirmée'
          ? axios
              .post(Constants.expoConfig.extra.url + '/livraison', {
                date: CommandsState.date,
                camion: watch('camion').id,
                chauffeur: watch('chauffeur').id,
                fournisseur: user._id,
                listProducts: CommandsState.listProducts,
              })
              .then((livraison) => {
                setCommandesState(null)
                setShowFormulaire(false)
                consulterListCommandes()
              })
          : (setCommandesState(null), consulterListCommandes())
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
    consulterListFournisseurs()
    consulterListCamions()
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
            <Pressable
              onPress={() => {
                setCommandesState(null)
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
                  Confirmer
                </Text>
                <Pressable
                  onPress={() => {
                    // modifierCommande('Confirmée')
                    setShowFormulaire(true)
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
              {showFormulaire && (
                <View style={{ width: 300 }}>
                  <Controller
                    name="chauffeur"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <>
                        <Text>Chauffeur :</Text>
                        <Dropdown
                          onSelect={onChange}
                          data={ListFournisseur.map((fournisseur) => {
                            return {
                              label:
                                fournisseur.firstName +
                                ' ' +
                                fournisseur.lastName,
                              id: fournisseur._id,
                            }
                          })}
                        />
                      </>
                    )}
                  />
                  <Controller
                    name="camion"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <>
                        <Text>Camion :</Text>
                        <Dropdown
                          onSelect={onChange}
                          data={listCamions.map((fournisseur) => {
                            return {
                              label:
                                fournisseur.model +
                                ' ' +
                                fournisseur.serieNumber,
                              id: fournisseur._id,
                            }
                          })}
                        />
                      </>
                    )}
                  />
                  <Button
                    onPress={() => modifierCommande('Confirmée')}
                    title="Confirmer Commande"
                  ></Button>
                </View>
              )}
            </Pressable>
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
