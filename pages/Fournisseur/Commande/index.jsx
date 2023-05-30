import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Dropdown from '../../../components/Dropdown'
import { Controller, useForm } from 'react-hook-form'

const FomrCommande = () => {
  const [fournisseur, setFournisseur] = useState(null)
  const { control, handleSubmit } = useForm({ defaultValues: { fournisseur } })
  const data = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
  ]
  return (
    <View>
      <Text>Commande</Text>
    </View>
  )
}

export default FomrCommande

const styles = StyleSheet.create({})
