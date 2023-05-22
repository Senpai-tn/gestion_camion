import { StyleSheet, Text, View } from 'react-native'

import { Provider, useSelector } from 'react-redux'
import store from './redux/store'
import Navigator from './Navigator'
export default function App() {
  return (
    <Provider store={store}>
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
