import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Controller, useForm } from 'react-hook-form'
import { TextInputComp } from '../../components'
import SelectDropdown from 'react-native-select-dropdown'
import validator from 'validator'
import axios from 'axios'
import Constants from 'expo-constants'

const Register = ({ navigation }) => {
  const agences = [
    { name: 'Sagem Ezzahra', code: 5 },
    { name: 'Sagem Borj ghorbel', code: 8 },
    { name: 'Sagem Megrine', code: 0 },
  ]

  const services = [
    { name: 'Service Informatique', code: 3 },
    { name: 'Service Réseaux', code: 1 },
    { name: 'Service Logistiques', code: 9 },
  ]
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      tel: '',
      cin: '',
      agence: null,
      service: null,
      matricule: '',
    },
  })

  const registerAction = (data) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      tel,
      cin,
      agence,
      service,
      matricule,
    } = data

    if (email && validator.isEmail(email)) {
      if (password === confirmPassword) {
        if (
          matricule[0] == agence.code &&
          matricule[1] == service.code &&
          matricule.length === 8
        ) {
          axios
            .post(Constants.expoConfig.extra.url + '/user', {
              firstName,
              lastName,
              email,
              password,
              tel,
              cin,
              role: 'PLANIFICATEUR',
              matricule,
            })
            .then((response) => {})
        } else setError('matricule', { message: 'Vérifier votre matricule' })
      } else
        setError('confirmPassword', { message: 'Vérifier votre mot de passe' })
    } else setError('email', { message: 'Email non valide' })
  }
  return (
    <LinearGradient
      colors={['#01b8ec', '#3ac2fb', '#0096ff', '#145fbe', '#3636be']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 80,
          }}
        >
          <Text>Register</Text>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: { value: true, message: 'Champs Prénom obligatoire' },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInputComp
                placeholder={'Prénom'}
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: { value: true, message: 'Champs Nom obligatoire' },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInputComp
                placeholder={'Nom'}
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
          <Controller
            name="email"
            rules={{
              required: { value: true, message: 'Champs Email obligatoire' },
            }}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInputComp
                placeholder={'Email'}
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
          <Controller
            name="password"
            rules={{
              required: {
                value: true,
                message: 'Champs Mot de passe obligatoire',
              },
            }}
            control={control}
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
            name="confirmPassword"
            rules={{
              required: {
                value: true,
                message: 'Champs Confirmation mot de passe obligatoire',
              },
            }}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInputComp
                type={'password'}
                placeholder={'Confirmer votre mot de passe'}
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
          <Controller
            name="tel"
            rules={{
              required: { value: true, message: 'Champs Tel obligatoire' },
            }}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInputComp
                placeholder={'Tel'}
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
          <Controller
            name="cin"
            rules={{
              required: { value: true, message: 'Champs CIN obligatoire' },
              maxLength: { value: 8, message: 'Longeur doit être 8 chiffre' },
              minLength: { value: 8, message: 'Longeur doit être 8 chiffre' },
            }}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInputComp
                type={'text'}
                placeholder={'CIN'}
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
          <Controller
            name="agence"
            control={control}
            rules={{
              required: { value: true, message: 'Choisir votre agence' },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <SelectDropdown
                data={agences}
                value={value}
                onSelect={(selectedItem, index) => {
                  onChange(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.name
                }}
              />
            )}
          />
          <Controller
            name="service"
            rules={{
              required: { value: true, message: 'Choisir votre service' },
            }}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <SelectDropdown
                data={services}
                value={value}
                onSelect={(selectedItem, index) => {
                  onChange(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.name
                }}
              />
            )}
          />
          <Controller
            name="matricule"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInputComp
                type={'text'}
                placeholder={'Matricule'}
                value={value}
                onChange={onChange}
                error={error}
              />
            )}
          />
          <Button title="Connecter" onPress={handleSubmit(registerAction)} />
          <Text
            onPress={() => {
              navigation.navigate('Login')
            }}
            style={{ marginTop: 25 }}
          >
            Se connecter
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Register

const styles = StyleSheet.create({})
