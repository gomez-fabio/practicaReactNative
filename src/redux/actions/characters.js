import * as types from '../types/characters';
import { fetch, post } from 'practicaReactNative/src/webservices/webservices';
import { constants } from 'practicaReactNative/src/webservices';

function updateCharactersList(value) {
    return {
      type: types.CHARACTERS_UPDATE_LIST,
      value: value
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

  export function fetchCharactersList() {
    return (dispatch, getState) => {

      dispatch(setCharactersFetching(true))

      const fetchURL = '/v1/public/characters?apikey=' + constants.APIKEY

      fetch(fetchURL).then(response => {
        console.log("response: ", response)
        dispatch(updateCharactersList(response.data.results))
        dispatch(setCharactersFetching(false))
      }).catch(error => {
        console.log("error: ", error)
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