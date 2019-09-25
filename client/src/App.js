import React from 'react';
import Main from './components/Main';
import {Route} from 'react-router-dom';



function App() {
  return (
    <div>
      <Route exact path='/' component={Main}/>
    </div>
  );
}

export default App;