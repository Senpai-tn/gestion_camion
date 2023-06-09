import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeData } from '../../Utils/localStorage'
import actions from '../../redux/actions'
import { Controller, useForm } from 'react-hook-form'
import { TextInputComp } from '../../components'
import axios from 'axios'
import Constants from 'expo-constants'
import Ionicons from '@expo/vector-icons/Ionicons'

const Profil = ({ navigation }) => {
  const updateProfile = (data) => {
    const { firstName, lastName, email, tel, password } = data
    axios
      .put(Constants.expoConfig.extra.url + '/user', {
        id: user._id,
        firstName,
        lastName,
        email,
        tel,
        password,
      })
      .then((response) => {
        setNewData(null)
        dispatch({ type: actions.login, user: response.data })
        storeData(response.data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [newData, setNewData] = useState(null)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tel: user.tel,
      password: user.password,
    },
  })
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
      }}
    >
      {newData && (
        <Modal animationType="slide" transparent={true}>
          <Pressable
            onPress={() => {
              setNewData(false)
            }}
            style={{
              height: 150,
              width: '100%',
              flex: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00ffffc9',
            }}
          >
            <View
              style={{
                flex: 0.1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Controller
                control={control}
                name="firstName"
                render={({ field: { value, onChange } }) => (
                  <TextInputComp
                    value={value}
                    onChange={onChange}
                    placeholder={'Prénom : '}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { value, onChange } }) => (
                  <TextInputComp
                    value={value}
                    onChange={onChange}
                    placeholder={'Nom : '}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <TextInputComp
                    value={value}
                    onChange={onChange}
                    placeholder={'Email : '}
                  />
                )}
              />
              <Controller
                control={control}
                name="tel"
                render={({ field: { value, onChange } }) => (
                  <TextInputComp
                    value={value}
                    keyboardType={'numeric'}
                    onChange={onChange}
                    placeholder={'Tel : '}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <TextInputComp
                    type={'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={'Mot de passe : '}
                  />
                )}
              />
              <Pressable
                onPress={handleSubmit(updateProfile)}
                style={{
                  backgroundColor: '#00CC00',
                  alignSelf: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '900' }}>
                  Valider
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}

      <Text style={{ fontSize: 56, fontWeight: 900 }}>Profil</Text>
      <View
        style={{
          marginTop: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text>Prénom : {user.firstName}</Text>
        <Text>Nom : {user.lastName}</Text>
        <Text>Email : {user.email}</Text>
        <Text>CIN : {user.cin}</Text>
        <Text>Tel : {user.tel}</Text>
        <Text>Role : {user.role}</Text>
      </View>
      <Pressable
        onPress={() => {
          setNewData(user)
        }}
      >
        <View
          style={{
            backgroundColor: 'orange',
            alignSelf: 'flex-start',
            padding: 5,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ color: 'white' }}>Modifier</Text>
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

export default Profil

const styles = StyleSheet.create({})
