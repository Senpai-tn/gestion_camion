import { useState } from 'react'
import { View, Text, Button, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import validator from 'validator'
import Checkbox from 'expo-checkbox'
import Constants from 'expo-constants'
import { TextInputComp } from '../../components'
const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const { control, handleSubmit, setError } = useForm({
    defaultValues: { email: '', password: '', remember: true },
  })
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const loginAction = (data) => {
    const { email, password, remember } = data
    if (email && validator.isEmail(email)) {
      axios
        .get(Constants.expoConfig.extra.url + '/user', {
          params: { email, password },
        })
        .then((response) => {
          dispatch({
            type: actions.login,
            user: response.data,
          })
          remember && storeData(response.data)
        })
        .catch((error) => {
          switch (error.response.status) {
            case 404:
              setError('email', { message: 'Email incorrecte' })
              break
            case 403:
              setError('password', { message: 'Mot de passe incorrecte' })
              break
            case 402:
              setError('email', { message: 'Votre compte est supprimé' })
              break
            case 401:
              setError('email', {
                message: 'Votre compte est bloqué pour période',
              })
              break
          }
        })
    } else {
      setError('email', { message: 'Email non valide' })
    }

    // axios
    //   .post('http://127.0.0.1:3120/user', {
    //     firstName: 'BBBBBB',
    //     lastName: 'BBBBBB',
    //     email: 'AAAAA',
    //     password: 'AAAAA',
    //     tel: 'AAAAA',
    //     cin: 'AAAAA',
    //     role: 'SUPER_ADMIN',
    //     listeCamions: [],
    //     listeChauffeurs: [],
    //     categorie: 'AAAAA',
    //     adresse: 'AAAAA',
    //     listeCommandes: [],
    //   })
    //   .then((response) => {
    //     dispatch({
    //       type: actions.login,
    //       user: response.data,
    //     })
    //     storeData(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    // axios
    // .put('http://127.0.0.1:3120/user', {
    //   id: '6466708368bdab128f411df3',
    //   deletedAt: new Date(),
    // })
    // .then((response) => {
    //   dispatch({
    //     type: actions.login,
    //     user: response.data,
    //   })
    //   storeData(response.data)
    // })
    // .catch((error) => {
    //   console.log(error)
    // })

    // axios
    //   .delete('http://127.0.0.1:3120/user', {
    //     data: {
    //       id: '6466708368bdab128f411df3',
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  return (
    <LinearGradient
      colors={['#7cbfe9', '#a7fcc5', '#7cbfe9']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInputComp
              type={'email'}
              placeholder={'Email'}
              value={value}
              onChange={onChange}
              error={error}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInputComp
              type={'password'}
              placeholder={'Mot de passe'}
              value={value}
              onChange={onChange}
              error={error}
            />
          )}
        />
        <Controller
          control={control}
          name="remember"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Checkbox
              style={{ marginBottom: 10 }}
              value={value}
              onValueChange={onChange}
            />
          )}
        />
        <Pressable
          style={{ backgroundColor: 'red' }}
          onPress={handleSubmit(loginAction)}
        >
          <Text>Connecter</Text>
        </Pressable>
        <Text
          onPress={() => {
            navigation.navigate('Register')
          }}
          style={{ marginTop: 25 }}
        >
          S'inscrire
        </Text>
      </View>
    </LinearGradient>
  )
}

export default Login
