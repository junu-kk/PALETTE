import {connect} from 'react-redux';
import * as signOutActions from '../../modules/authentication/signOut';
import MenuBar from '../../components/MenuBar';

export default connect(
    (state) => ({
        signOutStatus: state.signOut
    }),
    (dispatch) => ({
        onSignOut: () => {
            dispatch(signOutActions.signOut());
        },
        setSignOutStatus: (isSuccess) => {
            dispatch(signOutActions.setSignOutStatus(isSuccess))
        }
    })
)(MenuBar);