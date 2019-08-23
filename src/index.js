import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './components/routing';
import './style.styl';
console.log(process.env.NODE_ENV === 'development')
ReactDOM.render(<Routing />, document.getElementById('root'));
