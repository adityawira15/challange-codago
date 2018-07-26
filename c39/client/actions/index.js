import * as types from '../constants/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3001/api/'

export function addData(id, name, phone) {
  return { type: types.ADD_DATA, id, name, phone }
}

export function editData(id, name, phone) {
  return { type: types.EDIT_DATA, id, name, phone }
}

export function deleteData(id) {
  return { type: types.DELETE_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_ALL }
}

export function loadData() {
  return { type: types.LOAD_DATA }
}

export function loadPhoneBooks() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${SERVER_URL}phonebooks`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          dispatch(loadPhoneBooksFailure())
        } else {
          dispatch(loadPhoneBooksSuccess(res.body))
        }
      })
  }
}

export function loadPhoneBooksSuccess(phonebooks) {
  return { type: types.LOAD_PHONEBOOKS_SUCCESS, phonebooks }
}

export function loadPhoneBooksFailure() {
  return { type: types.LOAD_PHONEBOOKS_FAILURE }
}

export function addPhoneBook(name, phone) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(id, name, phone))
    return request
      .post(`${SERVER_URL}phonebooks`)
      .type('form')
      .send({ id: id })
      .send({ name: name })
      .send({ phone: phone })
      .end((err, res) => {
        if (err) {
          dispatch(addPhoneBookFailure());
        } else {
          dispatch(addPhoneBookSuccess(res.body));
        }
      })
  }
}

export function addPhoneBookFailure() {
  return { type: types.ADD_PHONEBOOK_FAILURE }
}

export function addPhoneBookSuccess(phonebook) {
  return { type: types.ADD_PHONEBOOK_SUCCESS, phonebook }
}

export function editPhoneBook(id, name, phone) {
  return dispatch => {
    dispatch(editData(id, name, phone));
    return request
      .post(`${SERVER_URL}phonebooks/${id}`)
      .type('form')
      .send({
        id: id,
        name: name,
        phone: phone
      })
      .end((err, res) => {
        if (err) {
          dispatch(editPhoneBookFailure())
        } else {
          dispatch(editPhoneBookSuccess(res.body))
        }
      })
  }
}

export function editPhoneBookSuccess(phonebook) {
  return { type: types.EDIT_PHONEBOOK_SUCCESS, phonebook }
}

export function editPhoneBookFailure() {
  return { type: types.EDIT_PHONEBOOK_FAILURE, phonebook }
}

export function deletePhoneBook(id){
  return dispatch => {
    dispatch(deleteData(id));
    return request
      .get(`${SERVER_URL}phonebooks/${id}`)
      .set('Accept', 'application/json')
      .end((err, val) => {
        console.log(val)
        // if(err){
        //   dispatch(deletePhoneBookFailure())
        // }else{
        //   dispatch(deletePhoneBookSuccess(val.body))
        // }
      })
  }
}

export function deletePhoneBookSuccess(id){
  return {type: types.DELETE_PHONEBOOK_SUCCESS, id}
}

export function deletePhoneBookFailure(){
  return {type: types.DELETE_PHONEBOOK_FAILURE}
}