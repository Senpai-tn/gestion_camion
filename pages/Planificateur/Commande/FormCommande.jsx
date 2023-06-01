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
  const agent = useRoute().params ? useRoute().params.agent : null
  const { control, handleSubmit, setError, reset, watch } = useForm({
    defaultValues: {
      listProducts: [],
      products: [],
      date: new Date(),
      fournisseur: null,
    },
  })
  const actionAgent = (data) => {
    const { listProducts, products, date, fournisseur } = data

    const convertedListProducts = listProducts.map((id) => {
      return {
        product: id,
        qte: {
          nbPallete: parseInt(watch('nbPallete/' + id)) || 0,
          nbCarton: parseInt(watch('nbCarton/' + id)) || 0,
        },
      }
    })

    axios
      .post(Constants.expoConfig.extra.url + '/commande', {
        fournisseur: fournisseur.id,
        date: date,
        listProducts: convertedListProducts,
      })
      .then((response) => {
        navigation.navigate('Commandes', { commande: response.data })
      })
  }

  useEffect(() => {
    reset({})
    consulterListAgent()
    consulterListProducts()
  }, [params])

  useEffect(() => {
    consulterListAgent()
    consulterListProducts()
  }, [])

  return (
    <ScrollView>
      <Text
        onPress={() => {
          setOpen(true)
        }}
        style={{ textAlign: 'center', fontWeight: '900', fontSize: 30 }}
      >
        {type} Commande
      </Text>
      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange } }) =>
          open && (
            <DateTimePicker
              value={value}
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
            onSelectedItemsChange={onChange}
            selectedItems={value}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
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
              <Text>Quantité du : {id} (pièce)</Text>
              <Controller
                control={control}
                name={'nbPallete/' + id}
                render={({ field: { value, onChange } }) => (
                  <TextInputComp
                    keyboardType={'numeric'}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name={'nbCarton/' + id}
                render={({ field: { value, onChange } }) => (
                  <TextInputComp value={value} onChange={onChange} />
                )}
              />
            </>
          )
        })}

      <Button title={type} onPress={handleSubmit(actionAgent)} />
    </ScrollView>
  )
}

export default FormCommande

const styles = StyleSheet.create({})
