import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import SignIn from './SignIn';
import SignUp from './SignUp';
import {makeStyles} from '@material-ui/core/styles';
import {Collapse, Typography, Button} from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
    //   height: 180,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    container: {
      display: 'flex',
    },
    paper: {
      margin: theme.spacing(1)
    },
}));

export default function Main({onSignIn, onSignUp, signInStatus, signUpStatus, setSignInStatus, setSignUpStatus}) {
    const classes = useStyles();

    const [showSignIn, setSignIn] = React.useState(false);
    const [showSignUp, setSignUp] = React.useState(false);

    const [test, setTest] = React.useState(false);
    
    const handleShowSignIn = () => {
        setSignIn(!showSignIn);
        setSignUp(false);
    };

    const handleShowSignUp = () => {
        setSignUp(!showSignUp);
        setSignIn(false);
    };

    const redirect = () => {
        if(signInStatus.isSuccess) {
            setSignInStatus(false);
            return <Redirect to='/mypage'/>
        } else if(signUpStatus.isSuccess) {
            setSignUpStatus(false);
            return <Redirect to='/firstsignin'/>
        } else return null;
    };

    return (
        <div className={classes.root}>
            {redirect()}
            <Collapse in={!showSignIn}>
                <Button fullWidth borderRadius='50%' onClick={handleShowSignIn}>
                    Sign In
                </Button>
            </Collapse>
            <div className={classes.container}>
            <Collapse in={showSignIn}>
                <SignIn onSignIn={onSignIn}/>
            </Collapse>
            </div>
            <Collapse in={!showSignUp}>
                <Button fullWidth borderRadius='50%' onClick={handleShowSignUp}>
                    Sign Up
                </Button>
            </Collapse>
            <div className={classes.container}>
            <Collapse in={showSignUp}>
                <SignUp onSignUp={onSignUp}/>
            </Collapse>
            </div>
        </div>
    )
}

Main.propTypes = {
    onSignIn: PropTypes.func,
    onSignUp: PropTypes.func
}