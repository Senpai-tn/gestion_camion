import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Home, Login, Loading } from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from './pages/Register'
import { Home as HomePlanificateur } from './pages/Planificateur'
import { FormAgent } from './pages/Planificateur/Agent'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  FormFournisseur,
  ListFournisseur,
} from './pages/Planificateur/Fournisseur'
import { StatusBar } from 'expo-status-bar'
import ListCommands from './pages/Planificateur/Commande/ListCommands'
import FormCommande from './pages/Planificateur/Commande/FormCommande'
import actions from './redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Add as AddChauffeur, List } from './pages/Fournisseur/Chauffeur'
import { Home as HomeFournisseur } from './pages/Fournisseur'
import {
  Add as AddCamion,
  List as ListCamion,
} from './pages/Fournisseur/Camion'
import Livraison from './pages/Agent'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const Navigator = () => {
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <NavigationContainer>
      {user === undefined ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        <Tab.Navigator
          screenOptions={{
            header: () => (
              <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                <Pressable onPress={() => {}}>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 900,
                      paddingHorizontal: 50,
                      paddingTop: 50,
                    }}
                  >
                    Profil
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    dispatch({ type: actions.login, user: null })
                    storeData(null)
                  }}
                >
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 900,
                      paddingHorizontal: 150,
                      paddingTop: 50,
                    }}
                  >
                    Déconnecter
                  </Text>
                </Pressable>
              </View>
            ),
          }}
        >
          <Tab.Screen
            name="Liste Agents"
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      paddingLeft: 30,
                      zIndex: 1000,
                      width: '200%',
                      height: '100%',

                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Liste Agents</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            component={HomePlanificateur}
          />
          <Tab.Screen
            name="Form Agent"
            options={{
              tabBarButton: () => null,
            }}
            component={FormAgent}
          />

          <Tab.Screen
            name="Liste Fournisseurs"
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      width: '200%',

                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text>Liste Fournisseurs</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            component={ListFournisseur}
          />
          <Tab.Screen
            name="Form Fournisseur"
            options={{
              tabBarButton: () => null,
            }}
            component={FormFournisseur}
          />
          <Tab.Screen
            name="Commandes"
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      width: '200%',

                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text>Commandes</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            component={ListCommands}
          />
          <Tab.Screen
            name="Form Commande"
            options={{
              tabBarButton: () => null,
            }}
            component={FormCommande}
          />
        </Tab.Navigator>
      ) : user.role === 'FOURNISSEUR' ? (
        <Tab.Navigator
          screenOptions={{
            header: () => (
              <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                <Pressable onPress={() => {}}>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 900,
                      paddingHorizontal: 50,
                      paddingTop: 50,
                    }}
                  >
                    Profil
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    dispatch({ type: actions.login, user: null })
                    storeData(null)
                  }}
                >
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 900,
                      paddingHorizontal: 150,
                      paddingTop: 50,
                    }}
                  >
                    Déconnecter
                  </Text>
                </Pressable>
              </View>
            ),
          }}
        >
          <Tab.Screen
            name="Liste des Commandes"
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor: '#00eeff36',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Liste Commandes</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            component={HomeFournisseur}
          />
          <Tab.Screen
            name="Liste des Chauffeurs"
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor: '#00eeff36',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>
                      Liste Chauffeurs
                    </Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            component={List}
          />
          <Tab.Screen
            name="Add Chauffeur"
            options={{
              tabBarButton: () => null,
            }}
            component={AddChauffeur}
          />
          <Tab.Screen
            name="Liste des Camions"
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor: '#00eeff36',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Liste Camions</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            component={ListCamion}
          />
          <Tab.Screen
            name="Add Truck"
            options={{
              tabBarButton: () => null,
            }}
            component={AddCamion}
          />
        </Tab.Navigator>
      ) : user.role === 'AGENT_SECURITE' ? (
        <Stack.Navigator
          screenOptions={{
            header: () => (
              <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                <Pressable onPress={() => {}}>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 900,
                      paddingHorizontal: 50,
                      paddingTop: 50,
                    }}
                  >
                    Profil
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    dispatch({ type: actions.login, user: null })
                    storeData(null)
                  }}
                >
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 900,
                      paddingHorizontal: 150,
                      paddingTop: 50,
                    }}
                  >
                    Déconnecter
                  </Text>
                </Pressable>
              </View>
            ),
          }}
        >
          <Stack.Screen name="Home" component={Livraison} />
        </Stack.Navigator>
      ) : null}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})
