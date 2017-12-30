import axios from 'axios'
import * as constants from './constants'

export function configureAxios() {
// export function configureAxios(AUTH_TOKEN) {
  axios.defaults.baseURL = constants.BASE_URL;
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN; // si necesitaramos pasar un token lo usuariamos así.
  axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function fetch(url) {
  return axios.get(url).then((response) => {
    return response.data
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function post(url, data) {
    return axios.post(url,data).then((response) => {
      return response.data
    }).catch((error) => {
      if (error.response) {
        throw {code: error.response.status, msg: error.response.data, error: error}
      } else {
        throw {code: 500, msg: error.message, error: error}
      }
    });
  }