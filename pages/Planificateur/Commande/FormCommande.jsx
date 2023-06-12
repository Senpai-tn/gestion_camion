import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  ScrollView,
} from 'react-native'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInputComp } from '../../../components'
import axios from 'axios'
import Constants from 'expo-constants'
import { useRoute } from '@react-navigation/native'
import Dropdown from '../../../components/Dropdown'
import { useState } from 'react'
import MultiSelect from 'react-native-multiple-select'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import Navbar from '../../../components/Navbar'

const FormCommande = ({ navigation }) => {
  const [listFournisseurState, setListFournisseursState] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [open, setOpen] = useState(false)

  const consulterListAgent = () => {
    axios
      .get(Constants.expoConfig.extra.url + '/user/search', {
        params: {
          role: 'FOURNISSEUR',
          deletedAt: null,
        },
      })
      .then((response) => {
        setListFournisseursState(response.data)
      })
  }

  const consulterListProducts = () => {
    axios.get(Constants.expoConfig.extra.url + '/product').then((response) => {
      const x = response.data.map((p) => {
        return { id: p._id, name: p.name }
      })
      setListProducts(x)
    })
  }
  const { params } = useRoute()

  const type = useRoute().params ? useRoute().params.type : 'Ajouter'
  const commande = useRoute().params ? useRoute().params.commande : null
  const { control, handleSubmit, setError, reset, watch } = useForm({
    defaultValues: {
      listProducts: [],
      date: type === 'Ajouter' ? new Date() : dayjs(commande.date),
      fournisseur: null,
    },
  })
  const actionAgent = (data) => {
    console.log(data)

    const { listProducts, date, fournisseur } = data
    if (fournisseur) {
      const convertedListProducts = listProducts.map((id) => {
        return {
          product: id,
          qte: {
            nbPallete: parseInt(watch('nbPallete/' + id)) || 0,
            nbCarton: parseInt(watch('nbCarton/' + id)) || 0,
          },
        }
      })

      if (type === 'Ajouter') {
        axios
          .post(Constants.expoConfig.extra.url + '/commande', {
            fournisseur: fournisseur.id,
            date: date,
            listProducts: convertedListProducts,
          })
          .then((response) => {
            navigation.navigate('Commandes', { commande: response.data })
          })
      } else {
        axios
          .put(Constants.expoConfig.extra.url + '/commande', {
            id: commande._id,
            fournisseur: fournisseur.id,
            listProducts: convertedListProducts,
            etat: 'Envoyée',
          })
          .then((response) => {
            navigation.navigate('Commandes', { commande: response.data })
          })
      }
    } else {
      alert('Vous devez sélectionner le fournisseurs')
    }
  }

  useEffect(() => {
    reset({
      listProducts: [],
      date: type === 'Ajouter' ? new Date() : dayjs(commande.date),
      fournisseur: null,
    })
    consulterListAgent()
    consulterListProducts()
  }, [params])

  useEffect(() => {
    consulterListAgent()
    consulterListProducts()
  }, [])

  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '900',
          fontSize: 30,
          marginBottom: 50,
        }}
      >
        {type} Commande
      </Text>
      <Text onPress={() => setOpen(true)}>Choisir date du commande </Text>
      <Text>{watch('date') && dayjs(watch('date')).format('DD-MM-YYYY')}</Text>
      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange } }) =>
          open && (
            <DateTimePicker
              value={value || new Date()}
              onChange={(e) => {
                onChange(new Date(e.nativeEvent.timestamp))
                setOpen(false)
              }}
              mode="date"
            />
          )
        }
      />

      <Controller
        name="fournisseur"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Text>Fournisseur :</Text>

            <Dropdown
              onSelect={onChange}
              defaultValue={value}
              data={listFournisseurState.map((fournisseur) => {
                return {
                  label: fournisseur.firstName + ' ' + fournisseur.lastName,
                  id: fournisseur._id,
                }
              })}
            />
          </>
        )}
      />
      <Controller
        control={control}
        name="listProducts"
        render={({ field: { value, onChange } }) => (
          <MultiSelect
            hideTags
            items={listProducts}
            uniqueKey="id"
            itemFontSize={20}
            fontSize={20}
            styleInputGroup={{ height: 50 }}
            onSelectedItemsChange={onChange}
            selectedItems={value}
            selectText="Pick Items"
            searchInputPlaceholderText="Rechercher"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
        )}
      />
      {watch('listProducts') &&
        watch('listProducts').map((id) => {
          return (
            <>
              <Text>
                Quantité du :{' '}
                {
                  listProducts.find((p) => {
                    return p.id === id
                  }).name
                }{' '}
                (pièces)
              </Text>
              <Controller
                control={control}
                name={'nbPallete/' + id}
                render={({ field: { value, onChange } }) => (
                  <TextInputComp
                    keyboardType={'numeric'}
                    placeholder={'Nombre des palettes'}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name={'nbCarton/' + id}
                render={({ field: { value, onChange } }) => (
                  <TextInputComp
                    keyboardType={'numeric'}
                    value={value}
                    placeholder={'Nombre des Cartons'}
                    onChange={onChange}
                  />
                )}
              />
            </>
          )
        })}

      <Button
        title={type === 'Ajouter' ? 'Envoyer' : type}
        onPress={handleSubmit(actionAgent)}
      />
    </ScrollView>
  )
}

export default FormCommande

const styles = StyleSheet.create({})
