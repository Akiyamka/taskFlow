import React from 'react';
import './index.scss';

const Logo = () => (
  <div id='logo'>
    <h2>Taskflow</h2>
    <div id='logo-vector'>
      <svg width='34.37px' height='6.3px' id='rectangle1'>
        <path
          d='M 0, 0 
          L 6.1, 6.3
          L 34.37, 4.6
          L 34.37, 0 z'
        />
      </svg>
      <svg width='31.01px' height='4.4px' id='rectangle2'>
        <path
          d='M 0, 0 
          L 0, 4.4
          L 31.01, 2.5
          L 31.01, 0 z'
        />
      </svg>
      <svg width='45.26px' height='2.3px' id='rectangle3'>
        <path
          d='M 0, 0 
          L 0, 2.4
          L 45.26, 0 z'
        />
      </svg>
    </div>
  </div>
);

export default Logo;
