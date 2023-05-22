import AsyncStorage from '@react-native-async-storage/async-storage'

import actions from './actions'

const valeurInitial = {
  user: undefined,
  somme: 0,
}

const reducer = (state = valeurInitial, action) => {
  switch (action.type) {
    case actions.login: {
      return { ...state, user: action.user }
    }
    case actions.add: {
      return { ...state, somme: state.somme + action.somme }
    }
    default: {
      return state
    }
  }
}

export default reducer
