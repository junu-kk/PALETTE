import React, { Component } from 'react'
import SignIn from '../SignIn';


export default class Main extends Component {
    state = {
        showSignIn: false,
        showSignUp: false
    }

    toggleSignIn = () => {
        const {showSignIn} = this.state
        this.setState({
            showSignIn: !showSignIn
        })
    }

    toggleSignUp = () => {
        const {showSignUp} = this.state
        this.setState({
            showSignUp: !showSignUp
        })
    }

    render() {
        const {toggleSignIn} = this;
        const {showSignIn} = this.state;
        // TODO: MaterialUI를 이용하여 login과 signup이 슈루룩 하고 나올수있게!
        return (
            <div>
                <h1>Pallette</h1>
                {!showSignIn && <button onClick={toggleSignIn}>Sign In</button>}
                {showSignIn && <SignIn/>}
                {<!showSignUp && <button onClick={toggleSignUp}>Sign Up</button>}
                {showSignIn && <SignUp/>}
            </div> 
        )
    }
}