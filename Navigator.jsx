import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
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
import Profil from './pages/Profile'
import { navigationRef } from './RootNavigation'
import Chauffeur from './pages/Chauffeur'
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
    <NavigationContainer ref={navigationRef}>
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
      ) : user.role === 'PLANIFICATEUR' ? (
        <Tab.Navigator
          sceneContainerStyle={{ paddingTop: 50, paddingLeft: 10 }}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Liste Agents"
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Liste Agents'
                          ? '#FFBCB8'
                          : 'white',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
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
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Liste Fournisseurs'
                          ? '#FFBCB8'
                          : 'white',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>
                      Liste Fournisseurs
                    </Text>
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
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Commandes'
                          ? '#FFBCB8'
                          : 'white',
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
            component={ListCommands}
          />
          <Tab.Screen
            name="Form Commande"
            options={{
              tabBarButton: () => null,
            }}
            component={FormCommande}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Profil'
                          ? '#FFBCB8'
                          : 'white',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Profil</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            name="Profil"
            component={Profil}
          />
        </Tab.Navigator>
      ) : user.role === 'FOURNISSEUR' ? (
        <Tab.Navigator
          sceneContainerStyle={{ paddingTop: 50, paddingLeft: 10 }}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen
            name="Liste des Commandes"
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Liste des Commandes'
                          ? '#00eeff36'
                          : 'white',
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
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Liste des Chauffeurs'
                          ? '#00eeff36'
                          : 'white',
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
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Liste des Camions'
                          ? '#00eeff36'
                          : 'white',
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
          <Tab.Screen
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Profil'
                          ? '#00eeff36'
                          : 'white',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Profil</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            name="Profil"
            component={Profil}
          />
        </Tab.Navigator>
      ) : user.role === 'AGENT_SECURITE' ? (
        <Tab.Navigator
          sceneContainerStyle={{ paddingTop: 50, paddingLeft: 10 }}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name === 'Home'
                          ? '#C8ABFF'
                          : 'white',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>
                      Liste Livraisons
                    </Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            name="Home"
            component={Livraison}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Profil'
                          ? '#C8ABFF'
                          : 'white',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Profil</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            name="Profil"
            component={Profil}
          />
        </Tab.Navigator>
      ) : user.role === 'CHAUFFEUR' ? (
        <Tab.Navigator
          sceneContainerStyle={{ paddingTop: 50, paddingLeft: 10 }}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Home" component={Chauffeur} />
          <Tab.Screen
            options={{
              tabBarIcon: () => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        navigationRef.current &&
                        navigationRef.current.getCurrentRoute().name ===
                          'Profil'
                          ? '#C8ABFF'
                          : 'white',
                      justifyContent: 'center',
                      flex: 0.7,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Profil</Text>
                  </View>
                )
              },
              tabBarLabel: () => {},
            }}
            name="Profil"
            component={Profil}
          />
        </Tab.Navigator>
      ) : null}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})
