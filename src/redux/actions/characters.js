import * as types from '../types/characters';
import { fetch, post } from 'practicaReactNative/src/webservices/webservices';
import { constants } from 'practicaReactNative/src/webservices';
import qs from 'qs'

function updateCharactersList(list, total) {
    return {
      type: types.CHARACTERS_UPDATE_LIST,
      list,
      total
    }
  }

export  function updateCharactersListOffset(value) {
    return {
      type: types.CHARACTERS_UPDATE_LIST_OFFSET,
      value,
    }
  }

  
  function setCharactersFetching(value) {
    return {
      type: types.CHARACTERS_SET_FETCHING,
      value: value
    }
  }
  
  export function updateCharacterSelected(value) {
    return {
      type: types.CHARACTERS_UPDATE_CHARACTER,
      value: value
    }
  }

  export function initCharactersList() {
    return (dispatch, getState) => {

        dispatch(updateCharactersList([], 0))
        dispatch(updateCharactersListOffset(0))
        dispatch(fetchCharactersList())
    }
}

  export function fetchCharactersList() {
    return (dispatch, getState) => {

      dispatch(setCharactersFetching(true))
        
      const state = getState() // Get redux state
      const list = state.characters.list // Get current characters list
      const offset = state.characters.offset
      const limit = 10

      const filters = {
          offset: offset,            
          limit: limit,
          apikey: constants.APIKEY
      }

      const fetchUrl = '/v1/public/characters?' + qs.stringify(filters)
      console.log("fetchCharactersList fetchUrl: ", fetchUrl)

      fetch( fetchUrl ).then(response => {

          console.log("fetchCharactersList response: ", response)
          dispatch(setCharactersFetching(false))

          const newList = [...list, ...response.data.results] // Concat current list with new results
          //console.log("fetchCharactersList newList: ", newList)
          console.log("fetchCharactersList newList length: ", newList.length)
          const total = response.data.total
          dispatch(updateCharactersList(newList, total)) // Update concatened list in reducer

      }).catch( error => {

          console.log("fetchCharactersList error: ", error)
          dispatch(setCharactersFetching(false))

      })
    
    }

}

export function postCharacter(data) {

  return {
    type: types.CHARACTER_POST_NEW_CHARACTER,
    data
}

/* // NO HAY POSIBILIDAD DE SUBIR NUEVOS PERSONAJES A MARVEL
  return (dispatch, getState) => {

      dispatch(setCharactersFetching(true))

      const fetchUrl = '/add_character'
      post(fetchUrl, data).then( response => {

          dispatch(setCharactersFetching(false))
          console.log("postCharacter response: ", response)

          if (response.record) {
              dispatch(fetchCharactersList())
              dispatch(updateCharacterSelected(null))
              Actions.pop()
          }

      }).catch( error => {
          dispatch(setCharactersFetching(false))
          console.log("postCharacter error: ", error)
      })
  }
  */
}