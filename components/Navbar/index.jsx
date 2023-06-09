import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useDispatch } from 'react-redux'
import actions from '../../redux/actions'
import { storeData } from '../../Utils/localStorage'
import Ionicons from '@expo/vector-icons/Ionicons'
const Navbar = ({ navigation }) => {
  const dispatch = useDispatch()
  return (
    <View
      style={{
        marginBottom: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <StatusBar />
      <Pressable
        onPress={() => {
          navigation.navigate('Profil')
        }}
      >
        <View
          style={{
            alignSelf: 'flex-start',

            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Ionicons name="person" color={'black'} size={30} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          dispatch({ type: actions.login, user: null })
          storeData(null)
        }}
      >
        <View
          style={{
            backgroundColor: 'red',
            alignSelf: 'flex-start',
            padding: 5,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ color: 'white' }}>Déconnecter</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({})
