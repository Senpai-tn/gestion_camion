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
import Navbar from '../../../components/Navbar'

const Add = ({ navigation }) => {
  const { params } = useRoute()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const type = useRoute().params ? useRoute().params.type : 'Ajouter'
  const camion = useRoute().params ? useRoute().params.camion : null
  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      model: type === 'Ajouter' ? '' : camion.model,
      serieNumber: type === 'Ajouter' ? '' : camion.serieNumber,
    },
  })
  const actionAgent = (data) => {
    const { model, serieNumber } = data

    if (type === 'Ajouter') {
      axios
        .post(Constants.expoConfig.extra.url + '/truck', {
          idFournisseur: user._id,
          model,
          serieNumber,
        })
        .then((response) => {
          dispatch({ type: actions.login, user: response.data })
          storeData(response.data)
          navigation.navigate('Liste des Camions', {
            agent: response.data,
          })
        })
        .catch((error) => {
          alert(error.message)
        })
    } else {
      axios
        .put(Constants.expoConfig.extra.url + '/truck', {
          id: camion._id,
          model,
          serieNumber,
        })
        .then((response) => {
          const x = user.listeCamions.map((c) => {
            console.log(c._id === response.data._id)
            return c._id === response.data._id ? response.data : c
          })
          console.log(x)
          dispatch({
            type: actions.login,
            user: {
              ...user,
              listeCamions: x,
            },
          })
          storeData({
            ...user,
            listeCamions: x,
          })
          navigation.navigate('Liste des Camions', {
            agent: response.data,
          })
        })
        .catch(() => {
          setError('cin', {
            message: 'Duplicate des données',
          })
        })
    }
  }

  useEffect(() => {
    reset({
      model: type === 'Ajouter' ? '' : camion.model,
      serieNumber: type === 'Ajouter' ? '' : camion.serieNumber,
    })
  }, [params])
  return (
    <View>
      <Navbar navigation={navigation} />
      <Text style={{ textAlign: 'center', fontWeight: '900', fontSize: 30 }}>
        {type} Camion
      </Text>
      <Controller
        name="model"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInputComp
            value={value}
            onChange={onChange}
            placeholder="Modèle"
          />
        )}
      />

      <Controller
        name="serieNumber"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInputComp
            value={value}
            onChange={onChange}
            placeholder="Numéro de série"
            error={error}
          />
        )}
      />

      <Button title={type} onPress={handleSubmit(actionAgent)} />
    </View>
  )
}

export default Add

const styles = StyleSheet.create({})
