import * as types from '../types/characters';

const initialState = {
    isFetching: false,
    list: [],
    total: 0,
    offset: 0,
    item: null
}

export default function reducer (state = initialState, action = {}) {

    switch (action.type) {
        case types.CHARACTERS_UPDATE_LIST:
          return {
              ...state,
              list: action.list,
              total: action.total
          };

          case types.CHARACTERS_UPDATE_LIST_OFFSET:
          return {
              ...state,
              offset: action.value
          }

          case types.CHARACTERS_UPDATE_CHARACTER:
          return {
            ...state,
            item: action.value
          }
    
        case types.CHARACTERS_SET_FETCHING:
          return {
            ...state,
            isFetching: action.value
          }
        
          case types.CHARACTER_POST_NEW_CHARACTER:
          return {
              ...state,
              list: [...state.list, action.value]
          }
    
        default:
          return state;
      }
}