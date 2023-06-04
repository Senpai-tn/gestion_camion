import { useState } from 'react'
import { View, Text, Button, Pressable, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import validator from 'validator'
import Checkbox from 'expo-checkbox'
import Constants from 'expo-constants'
import { TextInputComp } from '../../components'
import { storeData } from '../../Utils/localStorage'
import { Image } from 'react-native'
const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const { control, handleSubmit, setError } = useForm({
    defaultValues: { email: '', password: '', remember: true },
  })

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
          if (error.response) {
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
          } else {
            alert(error.message)
          }
        })
    } else {
      setError('email', { message: 'Email non valide' })
    }
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
        <Image
          source={require('../../assets/logo.png')}
          style={{ height: '7%', width: Dimensions.get('window').width - 100 }}
        />
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
          style={{
            backgroundColor: 'red',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            width: 100,
          }}
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
