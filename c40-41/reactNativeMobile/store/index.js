import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducer'

export function configuration(initialState){
    let enhancer = compose(applyMiddleware(thunkMiddleware))
    let store = createStore(rootReducer,initialState, enhancer)
    return store
}