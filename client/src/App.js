import React from 'react';
import {Route, Switch} from 'react-router-dom';

// FIXME: 나중에 다 container들로 바꿔줘야함!
import MainContainer from './containers/MainContainer/MainContainer';
import MenuBarContainer from './containers/MenuBarContainer';

import MyPageContainer from './containers/MyPageContainer';
import FirstSignInContainer from "./containers/FirstSignInContainer";

import SchoolContainer from './containers/SchoolContainer';
import ClubContainer from './containers/ClubContainer';
import CompetitionContainer from './containers/CompetitionContainer';


function App() {
  return (
    <div>
        <Switch>
            <Route exact path='/' component={MainContainer}/>
            <Route exact path='/firstsignin' component={FirstSignInContainer}/>
            <Route path='/' component={MenuBarContainer}/>
        </Switch>
        <Route exact path='/mypage' component={MyPageContainer}/>
        <Route exact path='/school' component={SchoolContainer}/>
        <Route exact path='/club' component={ClubContainer}/>
        <Route exact path='/competition' component={CompetitionContainer}/>

    </div>
  );
}

export default App;