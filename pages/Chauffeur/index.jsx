import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import dayjs from 'dayjs'
import DateTimePicker from '@react-native-community/datetimepicker'

const Chauffeur = ({ navigation }) => {
  const [livraisons, setLivraisons] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const user = useSelector((state) => state.user)
  const getLivraison = () => {
    console.log('chauffeur')
    axios
      .get(Constants.expoConfig.extra.url + '/livraison/all')
      .then((response) => {
        setLivraisons(response.data)
      })
      .catch((error) => {
        console.log('fdgsdgdfsgdfs', error)
      })
  }

  useEffect(() => {
    getLivraison()
  }, [])
  return (
    <View>
      <Navbar navigation={navigation} />
      <Text
        onPress={() => {
          setOpen(true)
        }}
      >
        Choisir Date
      </Text>
      {open && (
        <DateTimePicker
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(new Date(e.nativeEvent.timestamp))
            setOpen(false)
          }}
          mode="date"
        />
      )}
      {livraisons.filter((l) => {
        return (
          l.chauffeur &&
          l.chauffeur._id === user._id &&
          dayjs(l.date).format('DD-MM-YYYY') ===
            dayjs(selectedDate).format('DD-MM-YYYY')
        )
      }) > 0 ? (
        livraisons
          .filter((l) => {
            return (
              l.chauffeur &&
              l.chauffeur._id === user._id &&
              dayjs(l.date).format('DD-MM-YYYY') ===
                dayjs(selectedDate).format('DD-MM-YYYY')
            )
          })
          .map((l) => {
            return <Text>{dayjs(l.date).format('DD-MM-YYYY HH:mm')}</Text>
          })
      ) : (
        <Text>Aucune livraison pour cette date</Text>
      )}
    </View>
  )
}

export default Chauffeur

const styles = StyleSheet.create({})
