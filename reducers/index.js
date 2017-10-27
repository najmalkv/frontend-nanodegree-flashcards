import { RECEIVE_DECKS, ADD_DECK } from '../actions'

let intialState = {
  decks: []
}


function decks (state = intialState, action) {

  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: action.decks,
      }


    default :
      return state
  }
}

export default decks