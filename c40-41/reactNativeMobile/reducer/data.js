import * as types from '../contains/types'

const initialState = []

export default function dataReducers(state = initialState, action) {
    switch (action.type) {
        case 'test':
            return state
        case types.LOAD_DATA:
            return state
        case types.LOAD_DATA_SUCCESS:
            return action.data
        case types.LOAD_DATA_FAILURE:
            return state
        default:
            return state
    }
}