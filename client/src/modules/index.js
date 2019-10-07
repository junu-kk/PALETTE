import signIn from './authentication/signIn';
import signUp from './authentication/signUp';
import signOut from './authentication/signOut';
import firstSignIn from './firstSignIn';


import {combineReducers} from 'redux';

export default combineReducers({
    signIn,
    signUp,
    firstSignIn,
    signOut,
})
