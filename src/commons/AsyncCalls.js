import axios from 'axios';
import { constants } from 'practicaReactNative/src/webservices';

export function fetchCharactersList() {
  const fetchURL = '/v1/public/characters?apikey=' + constants.APIKEY
  return axios.get(fetchURL)
}