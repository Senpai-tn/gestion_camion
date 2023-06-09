import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeData } from '../../Utils/localStorage'

function Home({ navigation }) {
  const { user, somme } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <View>
      <Text>Home Screen</Text>
      {!user && (
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate('Login')
          }}
        />
      )}

      <Button
        title="Somme +5"
        onPress={() => {
          dispatch({ type: actions.add, somme: 5 })
        }}
      />
      <Button
        title="Logout"
        color={'green'}
        onPress={() => {
          dispatch({ type: actions.login, user: null })
          storeData(null)
        }}
      />
      <Text>{somme}</Text>
    </View>
  )
}

export default Home
