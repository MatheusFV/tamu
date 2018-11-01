import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import MessageReducer from './src/actions/Message/MessageReducer'

/** Authentication module */
// import offerReducer from '../../app/usecases/offer/actions/offerReducer'
// import navigationReducer from '../navigation/navigationReducer'

// import {
//     createReactNavigationReduxMiddleware,
// } from 'react-navigation-redux-helpers';

// const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
//     "root",
//     state => state.navigationReducer,
// );

// const logger = createLogger();

const combinedReducers = combineReducers({
    messageState: MessageReducer
})

const middlewares = [thunkMiddleware ]


// Centralized application state
// For more information visit http://redux.js.org/
const store = createStore(combinedReducers, applyMiddleware(...middlewares));

export default store;