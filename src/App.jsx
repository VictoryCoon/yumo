import React, {Component, useState} from 'react';
import './css/App.css';
import Content  from './view/Content';
import BodyFrame  from './view/BodyFrame';

const App = () => {
  return (
    <div className="App">
      {/* <Portal/> */}
      {/* <BodyFrame/> */}
      <Content/>
      {/* <Footer/> */}
    </div>
  );
}


export default App;