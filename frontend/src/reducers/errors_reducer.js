import { combineReducers } from 'redux';
import SessionErrorReducers from './session_errors_reducer';

export default combineReducers({
    session: SessionErrorReducers
});