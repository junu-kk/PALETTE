import React from 'react';

// TODO: 나중에 다 container들로 바꿔줘야함!
import {Route} from 'react-router-dom';
import MainContainer from './containers/MainContainer/MainContainer';



function App() {
  return (
    <div>
      <Route exact path='/' component={MainContainer}/>
    </div>
  );
}

export default App;