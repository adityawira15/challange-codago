import * as types from '../contains/types'
import request from 'superagent'

const SERVER_URL = 'http://192.168.1.3:3000/'

export function test(){
    return {type: 'test'}
}

export function loadDataEcommerce(dispatch){
    return dispatch => {
        dispatch(loadData())
        return request
        .get(SERVER_URL + 'api/ecommerce')
        .set('accept', 'application/json')
        .end((err, response) => {
            if(err){
                dispatch(loadDataFailure())
            }else{
                dispatch(loadDataSuccess(JSON.parse(response.text)))
            }
        })
    }
}

function loadData(){
    return {type: types.LOAD_DATA}
}


function loadDataSuccess(data){
    return {type: types.LOAD_DATA_SUCCESS, data}
}

function loadDataFailure(){
    return {type: types.LOAD_DATA_FAILURE}
}