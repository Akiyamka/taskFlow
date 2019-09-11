import React from 'react';
import Logo from '../Logo';
import TotalTime from '../../controls/TotalTime';
import Menu from '../Menu';
import style from './style.styl';

const Header = () => (
  <div className={style.header}>
    <Menu />
    <Logo />
    <TotalTime />
  </div>
);

export default Header;
