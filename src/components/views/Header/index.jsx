import React from 'react';
import Logo from '../Logo';
import TotalTime from '../../controls/TotalTime';
import './index.scss';

const Header = () => (
  <div id='header'>
    <Logo />
    <TotalTime />
  </div>
);

export default Header;
