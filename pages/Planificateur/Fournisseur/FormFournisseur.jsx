import { StyleSheet, Text, View, Pressable, Button } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInputComp } from '../../../components'
import axios from 'axios'
import Constants from 'expo-constants'
import { useRoute } from '@react-navigation/native'
import validator from 'validator'
import { useEffect } from 'react'

const FormAgent = ({ navigation }) => {
  const { params } = useRoute()
  const type = useRoute().params ? useRoute().params.type : 'Ajouter'
  const fournisseur = useRoute().params ? useRoute().params.agent : null
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      firstName: type === 'Ajouter' ? '' : fournisseur.firstName,
      lastName: type === 'Ajouter' ? '' : fournisseur.lastName,
      email: type === 'Ajouter' ? '' : fournisseur.email,
      password: '',
      tel: type === 'Ajouter' ? '' : fournisseur.tel,
      cin: type === 'Ajouter' ? '' : fournisseur.cin,
      categorie: type === 'Ajouter' ? '' : fournisseur.categorie,
      adresse: type === 'Ajouter' ? '' : fournisseur.adresse,
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
            .post(Constants.expoConfig.extra.url + '/user', {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              tel: tel,
              cin: cin,
              role: 'FOURNISSEUR',
            })
            .then((response) => {
              navigation.navigate('Liste Fournisseurs', {
                agent: response.data,
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
            id: fournisseur._id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            tel: tel,
            cin: cin,
          })
          .then((response) => {
            navigation.navigate('Liste Fournisseurs', { agent: response.data })
          })
      } else setError('email', { message: 'Email non valide' })
    }
  }

  useEffect(() => {
    reset({
      firstName: type === 'Ajouter' ? '' : fournisseur.firstName,
      lastName: type === 'Ajouter' ? '' : fournisseur.lastName,
      email: type === 'Ajouter' ? '' : fournisseur.email,
      password: '',
      tel: type === 'Ajouter' ? '' : fournisseur.tel,
      cin: type === 'Ajouter' ? '' : fournisseur.cin,
      categorie: type === 'Ajouter' ? '' : fournisseur.categorie,
      adresse: type === 'Ajouter' ? '' : fournisseur.adresse,
      confirmPassword: '',
    })
  }, [params, navigation])
  return (
    <View>
      <Text style={{ textAlign: 'center', fontWeight: '900', fontSize: 30 }}>
        {type} Fournisseur
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
        render={({ field: { value, onChange } }) => (
          <TextInputComp value={value} onChange={onChange} placeholder="CIN" />
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
      <Controller
        name="adresse"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInputComp
            value={value}
            onChange={onChange}
            placeholder={'Adresse'}
          />
        )}
      />
      <Controller
        name="categorie"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInputComp
            value={value}
            onChange={onChange}
            placeholder={'Catégorie'}
          />
        )}
      />

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

      <Button title={type} onPress={handleSubmit(actionAgent)} />
    </View>
  )
}

export default FormAgent

const styles = StyleSheet.create({})
