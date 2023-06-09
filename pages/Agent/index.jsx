import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import dayjs from 'dayjs'
import Navbar from '../../components/Navbar'
const Livraison = ({ navigation }) => {
  const [livraisons, setLivraisons] = useState([])
  const getLivraison = () => {
    axios
      .get(Constants.expoConfig.extra.url + '/livraison', {
        params: {
          filter: {
            min_date: dayjs().format('YYYY-MM-DD'),
            max_date: dayjs().format('YYYY-MM-DD'),
          },
        },
      })
      .then((response) => {
        setLivraisons(response.data)
      })
      .catch((error) => {
        console.log('error')
      })
  }

  const action = (payload) => {
    axios
      .put(Constants.expoConfig.extra.url + '/livraison', payload)
      .then(() => {
        getLivraison()
      })
  }

  useEffect(() => {
    getLivraison()
  }, [])
  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      {livraisons.length > 0 ? (
        livraisons
          .sort((a, b) => {
            return a.date > b.date ? 1 : -1
          })
          .map((l, index) => {
            let duree = 0
            l.listProducts.map((p) => {
              console.log(p.qte)
              duree += p.qte.nbCarton * 5 + p.qte.nbPallete * 2
            })
            return (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  backgroundColor: index % 2 === 0 ? 'grey' : 'white',
                  height: 80,
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                }}
                key={l._id}
              >
                <Text style={{ width: '15%' }}>
                  {dayjs(l.date).format('HH:mm')}
                </Text>
                <Text style={{ flex: 1 }}>
                  {l.chauffeur && l.chauffeur.cin}
                </Text>
                <Text style={{ flex: 1 }}>
                  {l.camion && l.camion.model + ' ' + l.camion.serieNumber}
                </Text>
                {l.entree && (
                  <Text style={{ flex: 1 }}>
                    entré le : {dayjs(l.entree).format('HH:mm')}
                  </Text>
                )}
                <Text style={{ flex: 1 }}>durée : {duree + ' minutes'} </Text>
                {l.entree && (
                  <Text style={{ flex: 1 }}>
                    sortie prévu :{' '}
                    {dayjs(l.entree).add(duree, 'minute').format('HH:mm')}
                  </Text>
                )}
                {!l.sortie && l.entree && (
                  <Pressable
                    onPress={() => {
                      action({ id: l._id, sortie: dayjs() })
                    }}
                  >
                    <Text>Déclarer Sortie</Text>
                  </Pressable>
                )}
                {!l.entree && (
                  <Pressable
                    onPress={() => {
                      action({ id: l._id, entree: dayjs() })
                    }}
                  >
                    <Text style={{ textAlign: 'right' }}>Déclarer Entrée</Text>
                  </Pressable>
                )}
              </View>
            )
          })
      ) : (
        <Text>Aucune Livraison pour aujourd'hui</Text>
      )}
    </ScrollView>
  )
}

export default Livraison

const styles = StyleSheet.create({})
