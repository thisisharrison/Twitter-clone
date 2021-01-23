import {
    RECEIVE_CURRENT_USER,
    RECEIVE_SESSION_ERRORS,
} from "../actions/session_actions";

const _nullErrors = [];

const SessionErrorReducers = (state=_nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
        // Receieve new errors, replace old ones
        case RECEIVE_SESSION_ERRORS: 
            return action.errors;
        // Successful logged in, clear errors
        case RECEIVE_CURRENT_USER:
            return _nullErrors;
        default: 
            return state;
    }
}
export default SessionErrorReducers;