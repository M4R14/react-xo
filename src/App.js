import React, { Component } from 'react';
import XO from './react-xo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container has-text-centered" style={{marginTop:"50px"}}>
          <XO winner={(winer)=>console.log({winer:winer})}/>      
        </div>
      </div>
    );
  }
}

export default App;
