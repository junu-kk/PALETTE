import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import SignIn from './SignIn';
import SignUp from './SignUp';
import {makeStyles} from '@material-ui/core/styles';
import {Switch, Collapse, Typography} from '@material-ui/core';

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
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
}));

export default function Start({onSignIn, onSignUp, signInStatus, signUpStatus}) {
    const classes = useStyles();

    const [showSignIn, setSignIn] = React.useState(false);
    const [showSignUp, setSignUp] = React.useState(false);

    const [test, setTest] = React.useState(false);
    
    const handleShowSignIn = () => {
        setSignIn(!showSignIn);
        setSignUp(false);
    };

    const handleShowSignUP = () => {
        setSignUp(!showSignUp);
        setSignIn(false);
    };

    return (
        <div className={classes.root}>
            {signInStatus.isSuccess && <Redirect to='/mypage'/>}
            {signUpStatus.isSuccess && <Redirect to='/firstsignin'/>}
            {}
            <Typography onClick={handleShowSignIn} component="h1" variant="h5">
                Sign in
            </Typography>
            <div className={classes.container}>
            <Collapse in={showSignIn}>
                <SignIn onSignIn={onSignIn}/>
            </Collapse>
            </div>
            <Typography onClick={handleShowSignUP} component="h1" variant="h5">
                Sign Up
            </Typography>
            <div className={classes.container}>
            <Collapse in={showSignUp}>
                <SignUp onSignUp={onSignUp}/>
            </Collapse>
            </div>
        </div>
    )
}

Start.propTypes = {
    onSignIn: PropTypes.func,
    onSignUp: PropTypes.func
}