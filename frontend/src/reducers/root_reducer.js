import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer';
import tweets from './tweets_reducer';

const rootReducer = combineReducers({
    session,
    errors, 
    tweets
})

export default rootReducer;