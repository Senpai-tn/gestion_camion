import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Home, Login, Loading } from './pages'
import { useSelector } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from './pages/Register'
import { Home as HomePlanificateur } from './pages/Planificateur'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  const { user } = useSelector((state) => state)

  return (
    <NavigationContainer>
      {user === undefined ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Loading"
            component={Loading}
          />
        </Stack.Navigator>
      ) : user === null ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      ) : user.role === 'SUPER_ADMIN' ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : user.role === 'PLANIFICATEUR' ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePlanificateur} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator></Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})
