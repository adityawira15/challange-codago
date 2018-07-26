import { ADD_DATA, EDIT_DATA, DELETE_DATA, DELETE_ALL, LOAD_DATA, LOAD_PHONEBOOKS_SUCCESS, LOAD_PHONEBOOKS_FAILURE, ADD_PHONEBOOK_SUCCESS, ADD_PHONEBOOK_FAILURE, EDIT_PHONEBOOK_SUCCESS, EDIT_PHONEBOOK_FAILURE } from '../constants/ActionTypes'

const initialState = []

export default function data(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return []
    case LOAD_PHONEBOOKS_SUCCESS:
      return action.phonebooks
    case ADD_DATA:
      return [
        {
          id: action.id,
          name: action.name,
          phone: action.phone
        },
        ...state
      ]
    case ADD_PHONEBOOK_SUCCESS:
      let phonebooks = state
      console.log('phonebooks', phonebooks);
      let idObject = phonebooks.map(function (x) {
        return x.id;
      }).indexOf(parseInt(action.phonebook.id));
      console.log('idObject', idObject);
      if (idObject > -1) {
        return state
      } else {
        console.log('state', state);
        return [action.phonebook, ...state]
      }
    case EDIT_DATA:
      return state.map(data => data.id === action.id ? Object.assign({}, data, { name: action.name, phone: action.phone }) : data)

    case EDIT_PHONEBOOK_SUCCESS:
      let editphonebooks = state
      console.log('editphonebooks', editphonebooks);

    case DELETE_DATA:
      return state.filter(data => data.id !== action.id)

    case DELETE_ALL:
      return []

    case LOAD_PHONEBOOKS_FAILURE:
    case ADD_PHONEBOOK_FAILURE:
      return state

    default:
      return state

  }
}
