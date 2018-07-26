import request from 'superagent';

const SERVER_URL = 'http://localhost:3000/api/'

function loadData(){
    return {type: 'LOAD_DATA'}
}

function addData(data){
    return {type: 'ADD_DATA', data}
}

export function getDataById(id){
    return {type: 'GET_DATA_BY_ID', id}
}

export function loadDataEcommerce(offset){
    return dispatch => {
        dispatch(loadData());
        return request
        .get(`${SERVER_URL}ecommerce?offset=${offset}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                dispatch(loadEcommerceFailure())
            } else {
                dispatch(loadEcommerceSuccess(res.body))
            }
          })
      }
}

function loadEcommerceFailure(){
    return {type: 'LOAD_DATA_ECOMMERCE_FAILURE'}
}

function loadEcommerceSuccess(values){
    return {type: 'LOAD_DATA_ECOMMERCE_SUCCESS', values}
}


export function addDataEcommerce(title, rate, description, price, brand, detail){
    let data = {
        id: Date.now(),
        title,
        rate,
        description,
        price,
        brand,
        detail
    }
    return dispatch => {
        dispatch(addData(data));
        return request
            .post(`${SERVER_URL}ecommerce`)
            .set('Accept', 'application/json')
            .send(data)
            .end((err, added) => {
                if(err){
                    dispatch(addDataEcommerceFailure())
                }else{
                    dispatch(addDataEcommerceSuccess(added.body))
                }
            })
    }
}

function addDataEcommerceSuccess(data){
    return {type: 'ADD_DATA_ECOMMERCE_SUCCESS', data}
}

function addDataEcommerceFailure(){
    return {type: 'ADD_DATA_ECOMMERCE_FAILURE'}
}

// export function getDataEcommerceById(id){
//     return dispatch => {
//         dispatch(getDataById(id))
//         return request
//             .get(`${SERVER_URL}ecommerce/${id}`)
//             .set('Accept', 'application/json')
//             .end((err, getById) => {
//                 if(err){
//                     dispatch(getDataEcommerceByIdFailure());
//                 }else{
//                     dispatch(getDataEcommerceByIdSuccess(getById.body))
//                 }
//             })
//     }
// }

// function getDataEcommerceByIdSuccess(getById){
//     return {type: 'GET_DATA_ECOMMERCE_BY_ID_SUCCESS', data: getById}
// }

// function getDataEcommerceByIdFailure(){
//     return {type: 'GET_DATA_ECOMMERCE_BY_ID_FAILURE'}
// }