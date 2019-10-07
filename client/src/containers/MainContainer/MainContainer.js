import {connect} from 'react-redux';
import Main from '../../components/Main';

import * as signUpActions from '../../modules/authentication/signUp';
import * as signInActions from '../../modules/authentication/signIn';

export default connect(
    (state) => ({
        signUpStatus: state.signUp,
        signInStatus: state.signIn,

    }),
    (dispatch) => ({
        onSignUp: (firstName, lastName, email, password) => {
            dispatch(signUpActions.signUp(firstName, lastName, email, password))
        },
        onSignIn: (email, password) => {
            dispatch(signInActions.signIn(email, password))
        },
        setSignInStatus: (isSuccess) => {
            dispatch(signInActions.setSignInStatus(isSuccess))
        },
        setSignUpStatus: (isSuccess) => {
            dispatch(signUpActions.setSignUpStatus(isSuccess))
        }
    })
)(Main);