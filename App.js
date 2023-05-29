import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import store from './redux/store'
import Navigator from './Navigator'
import { StatusBar } from 'expo-status-bar'
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <Navigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
