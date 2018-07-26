const initialState = []

export default function reducerAddAds(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return [];
        case 'LOAD_DATA_ECOMMERCE_SUCCESS':
            return action.values
        case 'LOAD_DATA_ECOMMERCE_FAILURE':
            return state
        case 'ADD_DATA':
            return [
                ...state,
                action.data
            ]
        case 'ADD_DATA_ECOMMERCE_SUCCESS':
            return state    
        // let data = state
            // let idObject = data.map(function (x) {
            //     return x.id;
            // }).indexOf(parseInt(action.data.id));
            // if (idObject > -1) {
            //     return state
            // } else {
            //     return [action.data, ...state]
            // }
        case 'ADD_DATA_ECOMMERCE_FAILURE':
            return state
        case 'GET_DATA_BY_ID':
            return state
        case 'GET_DATA_ECOMMERCE_BY_ID_SUCCESS':
            return action.values
        default:
            return state
    }
}