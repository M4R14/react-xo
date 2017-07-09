# React-XO

![alt text](https://github.com/M4R14/react-xo/blob/master/example.PNG?raw=true)
```jsx
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
```
