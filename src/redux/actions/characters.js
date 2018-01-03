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
        // console.log("response: ", response)
        dispatch(updateCharactersList(response.data.results))
        dispatch(setCharactersFetching(false))
      }).catch(error => {
        console.log("error: ", error)
        dispatch(setCharactersFetching(false))
      })
    }

}