import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const TextInputComp = ({
  value,
  type,
  onChange,
  error,
  placeholder,
  keyboardType,
}) => {
  return (
    <>
      <TextInput
        keyboardType={keyboardType ? keyboardType : 'default'}
        secureTextEntry={type === 'password'}
        style={{
          borderWidth: 2,
          width: 250,

          borderRadius: 20,
          borderColor: error ? 'red' : 'white',
          color: error ? 'red' : 'black',
          padding: 10,
          marginBottom: 10,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={(e) => {
          onChange(e)
        }}
      />
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </>
  )
}

export default TextInputComp

const styles = StyleSheet.create({})
