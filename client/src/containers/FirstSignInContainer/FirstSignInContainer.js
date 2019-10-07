import {connect} from 'react-redux';
import FirstSignIn from '../../components/FirstSignIn';

import * as actions from '../../modules/firstSignIn';

export default connect(
    (state) => ({
        status: state.firstSignIn
    }),
    (dispatch) => ({
        onSubmit: (dateOfBirth, address, introduction, grade, _class, workExperience, funFacts)  => {
            dispatch(actions.firstSignIn(dateOfBirth, address, introduction, grade, _class, workExperience, funFacts))
        }
    })
)(FirstSignIn);