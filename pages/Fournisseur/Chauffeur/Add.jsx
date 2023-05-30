import { StyleSheet, Text, View, Pressable, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInputComp } from '../../../components'
import axios from 'axios'
import Constants from 'expo-constants'
import { useRoute } from '@react-navigation/native'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions'
import { storeData } from '../../../Utils/localStorage'

const Add = ({ navigation }) => {
  const { params } = useRoute()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const type = useRoute().params ? useRoute().params.type : 'Ajouter'
  const agent = useRoute().params ? useRoute().params.agent : null
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      firstName: type === 'Ajouter' ? '' : agent.firstName,
      lastName: type === 'Ajouter' ? '' : agent.lastName,
      email: type === 'Ajouter' ? '' : agent.email,
      password: '',
      tel: type === 'Ajouter' ? '' : agent.tel,
      cin: type === 'Ajouter' ? '' : agent.cin,
      confirmPassword: '',
    },
  })
  const actionAgent = (data) => {
    const { firstName, lastName, email, password, tel, cin, confirmPassword } =
      data

    if (type === 'Ajouter') {
      if (email && validator.isEmail(email)) {
        if (password === confirmPassword) {
          axios
            .post(Constants.expoConfig.extra.url + '/user/chauffeur', {
              idFournisseur: user._id,
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              tel: tel,
              cin: cin,
            })
            .then((response) => {
              dispatch({ type: actions.login, user: response.data })
              storeData(response.data)
              navigation.navigate('Liste des Chauffeurs', {
                agent: response.data,
              })
            })
            .catch((error) => {
              console.log(error)
              setError('cin', {
                message: 'Duplicate des données',
              })
            })
        } else
          setError('confirmPassword', {
            message: 'Vérifier votre mot de passe',
          })
      } else setError('email', { message: 'Email non valide' })
    } else {
      if (email && validator.isEmail(email)) {
        axios
          .put(Constants.expoConfig.extra.url + '/user', {
            id: agent._id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            tel: tel,
            cin: cin,
          })
          .then((response) => {
            navigation.navigate('Liste des Chauffeurs', {
              agent: response.data,
            })
          })
          .catch(() => {
            setError('cin', {
              message: 'Duplicate des données',
            })
          })
      } else setError('email', { message: 'Email non valide' })
    }
  }

  useEffect(() => {
    reset({
      firstName: type === 'Ajouter' ? '' : agent.firstName,
      lastName: type === 'Ajouter' ? '' : agent.lastName,
      email: type === 'Ajouter' ? '' : agent.email,
      password: '',
      tel: type === 'Ajouter' ? '' : agent.tel,
      cin: type === 'Ajouter' ? '' : agent.cin,
      confirmPassword: '',
    })
  }, [params])
  return (
    <View>
      <Text style={{ textAlign: 'center', fontWeight: '900', fontSize: 30 }}>
        {type} Chauffeur
      </Text>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInputComp
            value={value}
            onChange={onChange}
            placeholder="Prénom"
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInputComp value={value} onChange={onChange} placeholder="Nom" />
        )}
      />
      <Controller
        name="cin"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInputComp
            value={value}
            onChange={onChange}
            placeholder="CIN"
            error={error}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInputComp
            value={value}
            onChange={onChange}
            placeholder="Email"
            error={error}
          />
        )}
      />
      <Controller
        name="tel"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInputComp
            value={value}
            onChange={onChange}
            placeholder={'Tel'}
          />
        )}
      />

      {type === 'Ajouter' && (
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInputComp
              value={value}
              onChange={onChange}
              placeholder="Mot de passe"
              type={'password'}
              error={error}
            />
          )}
        />
      )}
      {type === 'Ajouter' && (
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInputComp
              value={value}
              onChange={onChange}
              placeholder="Confirmez votre mot de passe "
              type={'password'}
              error={error}
            />
          )}
        />
      )}

      <Button title={type} onPress={handleSubmit(actionAgent)} />
    </View>
  )
}

export default Add

const styles = StyleSheet.create({})
