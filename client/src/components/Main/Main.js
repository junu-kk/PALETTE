import React from 'react'

import SignIn from './SignIn';
import SignUp from './SignUp';
import {makeStyles} from '@material-ui/core/styles';
import {Collapse, Container, Button} from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        }
    },
    root: {
    //   height: 180,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    container: {
      display: 'flex',
    },
    submit: {
        backgroundColor: theme.palette.primary,
        margin: theme.spacing(3, 0, 3),
    },
}));

export default function Main({onSignIn, onSignUp}) {
    const classes = useStyles();

    const [showSignIn, setSignIn] = React.useState(false);
    const [showSignUp, setSignUp] = React.useState(false);

    const handleShowSignIn = () => {
        setSignIn(!showSignIn);
        setSignUp(false);
    };

    const handleShowSignUp = () => {
        setSignUp(!showSignUp);
        setSignIn(false);
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Collapse in={!showSignIn}>
                <Button className={classes.submit} variant='contained' color='primary' fullWidth onClick={handleShowSignIn}>
                    Click to Sign In
                </Button>
            </Collapse>
            <div className={classes.container}>
            <Collapse in={showSignIn}>
                <SignIn onSignIn={onSignIn}/>
            </Collapse>
            </div>
            <Collapse in={!showSignUp}>
                <Button fullWidth className={classes.submit} variant='contained' color='primary' onClick={handleShowSignUp}>
                    Click to Sign Up
                </Button>
            </Collapse>
            <div className={classes.container}>
            <Collapse in={showSignUp}>
                <SignUp onSignUp={onSignUp}/>
            </Collapse>
            </div>
        </Container>
    )
}

Main.propTypes = {
    onSignIn: PropTypes.func,
    onSignUp: PropTypes.func
}