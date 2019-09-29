import signIn from './signIn';
import signUp from './signUp';
import {combineReducers} from 'redux';

export default combineReducers({
    signIn,
    signUp
})
